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
        return new DashboardResponse(
                List.of(
                        new Metric("Total consumption", units + " kWh", "-12.4%"),
                        new Metric("Predicted bill", "₹" + bill, "-8.1%"),
                        new Metric("Efficiency score", "91/100", "+6.3%"),
                        new Metric("Peak window", "6-9 PM", "3 alerts")
                ),
                List.of(
                        new ChartPoint("00:00", BigDecimal.valueOf(0.9), BigDecimal.valueOf(0.8)),
                        new ChartPoint("06:00", BigDecimal.valueOf(1.8), BigDecimal.valueOf(1.5)),
                        new ChartPoint("12:00", BigDecimal.valueOf(2.8), BigDecimal.valueOf(3.0)),
                        new ChartPoint("18:00", BigDecimal.valueOf(6.8), BigDecimal.valueOf(6.1))
                ),
                List.of(
                        new Recommendation("Shiftable load", "Move laundry cycles after 10 PM for lower peak exposure.", "9.6% bill reduction"),
                        new Recommendation("HVAC maintenance", "Compressor draw is above baseline; inspect filters.", "14% efficiency recovery")
                )
        );
    }
}
