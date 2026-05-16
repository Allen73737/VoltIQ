package com.voltiq.energy.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardDtos {
    public record Metric(String label, String value, String delta) {}
    public record ChartPoint(String label, BigDecimal actual, BigDecimal predicted) {}
    public record Recommendation(String title, String message, String impact) {}
    public record DashboardResponse(List<Metric> metrics, List<ChartPoint> hourlyUsage, List<Recommendation> recommendations) {}
}
