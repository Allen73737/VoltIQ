package com.voltiq.energy.service;

import com.voltiq.energy.dto.ApplianceDtos.*;
import com.voltiq.energy.entity.Appliance;
import com.voltiq.energy.entity.UsageLog;
import com.voltiq.energy.exception.ApiException;
import com.voltiq.energy.repository.ApplianceRepository;
import com.voltiq.energy.repository.UsageLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplianceService {
    private final ApplianceRepository applianceRepository;
    private final UsageLogRepository usageLogRepository;
    private final CurrentUserService currentUserService;
    private final SimpMessagingTemplate messagingTemplate;
    @Value("${app.energy.tariff-per-kwh}") private BigDecimal tariff;

    public List<ApplianceResponse> list() {
        return applianceRepository.findByUserOrderByCreatedAtDesc(currentUserService.get()).stream().map(this::map).toList();
    }

    public ApplianceResponse create(ApplianceRequest request) {
        Appliance appliance = applianceRepository.save(Appliance.builder()
                .user(currentUserService.get())
                .name(request.name())
                .zone(request.zone())
                .powerRatingKw(request.powerRatingKw())
                .active(false)
                .build());
        return map(appliance);
    }

    @Transactional
    public ApplianceResponse start(UUID id) {
        Appliance appliance = owned(id);
        if (!appliance.isActive()) {
            appliance.setActive(true);
            usageLogRepository.save(UsageLog.builder().appliance(appliance).startedAt(Instant.now()).build());
        }
        messagingTemplate.convertAndSend("/topic/energy", map(appliance));
        return map(appliance);
    }

    @Transactional
    public ApplianceResponse stop(UUID id) {
        Appliance appliance = owned(id);
        UsageLog log = usageLogRepository.findFirstByApplianceAndEndedAtIsNullOrderByStartedAtDesc(appliance)
                .orElseThrow(() -> new ApiException(HttpStatus.CONFLICT, "No active usage session"));
        Instant ended = Instant.now();
        long minutes = Math.max(1, Duration.between(log.getStartedAt(), ended).toMinutes());
        BigDecimal hours = BigDecimal.valueOf(minutes).divide(BigDecimal.valueOf(60), 4, RoundingMode.HALF_UP);
        BigDecimal units = appliance.getPowerRatingKw().multiply(hours).setScale(4, RoundingMode.HALF_UP);
        log.setEndedAt(ended);
        log.setDurationMinutes(minutes);
        log.setUnitsConsumed(units);
        log.setEstimatedCost(units.multiply(tariff).setScale(2, RoundingMode.HALF_UP));
        appliance.setActive(false);
        messagingTemplate.convertAndSend("/topic/energy", map(appliance));
        return map(appliance);
    }

    private Appliance owned(UUID id) {
        Appliance appliance = applianceRepository.findById(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Appliance not found"));
        if (!appliance.getUser().getId().equals(currentUserService.get().getId())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Appliance belongs to another workspace");
        }
        return appliance;
    }

    private ApplianceResponse map(Appliance appliance) {
        BigDecimal units = usageLogRepository.totalUnitsForAppliance(appliance.getId());
        return new ApplianceResponse(appliance.getId(), appliance.getName(), appliance.getZone(), appliance.getPowerRatingKw(), appliance.isActive(), units);
    }
}
