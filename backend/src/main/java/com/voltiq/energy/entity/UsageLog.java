package com.voltiq.energy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "usage_logs")
public class UsageLog {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private Appliance appliance;
    @Column(name = "started_at", nullable = false) private Instant startedAt;
    @Column(name = "ended_at") private Instant endedAt;
    @Column(name = "duration_minutes") private Long durationMinutes;
    @Column(name = "units_consumed") private BigDecimal unitsConsumed;
    @Column(name = "estimated_cost") private BigDecimal estimatedCost;
}
