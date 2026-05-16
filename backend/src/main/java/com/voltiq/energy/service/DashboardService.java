package com.voltiq.energy.service;

import com.voltiq.energy.dto.DashboardDtos.*;
import com.voltiq.energy.repository.UsageLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final CurrentUserService currentUserService;
    private final UsageLogRepository usageLogRepository;
    @Value("${app.energy.tariff-per-kwh}") private BigDecimal tariff;

    public DashboardResponse dashboard() {
        var user = currentUserService.get();
        BigDecimal units = usageLogRepository.totalUnitsForUser(user.getId()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal bill = units.multiply(tariff).setScale(2, RoundingMode.HALF_UP);
        boolean hasUsage = units.compareTo(BigDecimal.ZERO) > 0;

        return new DashboardResponse(
                List.of(
                        new Metric("Total consumption", units + " kWh", hasUsage ? "recorded" : "no sessions"),
                        new Metric("Predicted bill", "Rs " + bill, hasUsage ? "current tariff" : "waiting for usage"),
                        new Metric("Efficiency score", hasUsage ? "Baseline ready" : "Pending", hasUsage ? "needs 7 days" : "add sessions"),
                        new Metric("Peak window", hasUsage ? "Learning" : "Pending", hasUsage ? "collecting pattern" : "no alerts")
                ),
                List.of(
                        new ChartPoint("00:00", usageSlice(units, hasUsage, 0.12), BigDecimal.ZERO),
                        new ChartPoint("06:00", usageSlice(units, hasUsage, 0.18), BigDecimal.ZERO),
                        new ChartPoint("12:00", usageSlice(units, hasUsage, 0.27), BigDecimal.ZERO),
                        new ChartPoint("18:00", usageSlice(units, hasUsage, 0.43), BigDecimal.ZERO)
                ),
                hasUsage ? List.of(
                        new Recommendation("Build baseline", "Keep tracking sessions for seven days to calculate peak windows and efficiency.", "improves forecast quality"),
                        new Recommendation("Review appliance mix", "Compare high-rating appliances against total recorded units.", "finds priority loads")
                ) : List.of(
                        new Recommendation("Start tracking", "Add an appliance and complete a usage session to build a real baseline.", "required for analytics"),
                        new Recommendation("Use demo mode", "Open the demo campus to preview how a populated workspace behaves.", "sample data only")
                )
        );
    }

    private BigDecimal usageSlice(BigDecimal units, boolean hasUsage, double ratio) {
        if (!hasUsage) {
            return BigDecimal.ZERO;
        }
        return units.multiply(BigDecimal.valueOf(ratio)).setScale(2, RoundingMode.HALF_UP);
    }
}
