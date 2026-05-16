package com.voltiq.energy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

public class ApplianceDtos {
    public record ApplianceRequest(@NotBlank String name, @NotBlank String zone, @NotNull @Positive BigDecimal powerRatingKw) {}
    public record ApplianceResponse(UUID id, String name, String zone, BigDecimal powerRatingKw, boolean active, BigDecimal estimatedUnits) {}
}
