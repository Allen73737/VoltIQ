package com.voltiq.energy.scheduler;

import com.voltiq.energy.entity.Report;
import com.voltiq.energy.repository.ReportRepository;
import com.voltiq.energy.repository.UsageLogRepository;
import com.voltiq.energy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReportScheduler {
    private final UserRepository userRepository;
    private final UsageLogRepository usageLogRepository;
    private final ReportRepository reportRepository;
    @Value("${app.energy.tariff-per-kwh}") private BigDecimal tariff;

    @Scheduled(cron = "0 0 2 * * MON")
    public void generateWeeklyReports() {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(7);
        userRepository.findAll().forEach(user -> {
            BigDecimal units = usageLogRepository.totalUnitsForUser(user.getId());
            reportRepository.save(Report.builder()
                    .user(user)
                    .title("Weekly Energy Intelligence Report")
                    .periodStart(start)
                    .periodEnd(end)
                    .totalUnits(units)
                    .predictedBill(units.multiply(tariff))
                    .build());
        });
        log.info("Generated weekly VoltIQ energy reports");
    }
}
