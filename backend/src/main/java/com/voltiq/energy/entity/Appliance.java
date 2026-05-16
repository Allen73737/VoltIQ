package com.voltiq.energy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "appliances")
public class Appliance {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private User user;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String zone;
    @Column(name = "power_rating_kw", nullable = false) private BigDecimal powerRatingKw;
    @Column(nullable = false) private boolean active;
    @CreationTimestamp @Column(name = "created_at", nullable = false) private Instant createdAt;
}
