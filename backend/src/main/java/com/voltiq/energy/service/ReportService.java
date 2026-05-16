package com.voltiq.energy.service;

import com.voltiq.energy.repository.UsageLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final CurrentUserService currentUserService;
    private final UsageLogRepository usageLogRepository;

    public String csv() {
        var user = currentUserService.get();
        var units = usageLogRepository.totalUnitsForUser(user.getId()).setScale(4, RoundingMode.HALF_UP);
        return "workspace,total_units,insight\n" + user.getOrganization() + "," + units + ",Shift flexible loads outside peak hours\n";
    }

    public byte[] pdfPlaceholder() {
        return "%PDF-1.4\n% VoltIQ report export endpoint placeholder\n%%EOF".getBytes(StandardCharsets.UTF_8);
    }
}
