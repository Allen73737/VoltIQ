package com.voltiq.energy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "reports")
public class Report {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private User user;
    @Column(nullable = false) private String title;
    @Column(name = "period_start", nullable = false) private LocalDate periodStart;
    @Column(name = "period_end", nullable = false) private LocalDate periodEnd;
    @Column(name = "total_units", nullable = false) private BigDecimal totalUnits;
    @Column(name = "predicted_bill", nullable = false) private BigDecimal predictedBill;
    @CreationTimestamp @Column(name = "created_at", nullable = false) private Instant createdAt;
}
