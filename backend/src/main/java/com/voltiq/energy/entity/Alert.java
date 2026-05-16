package com.voltiq.energy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "alerts")
public class Alert {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private User user;
    @Column(nullable = false) private String severity;
    @Column(nullable = false) private String title;
    @Column(nullable = false, length = 500) private String message;
    @Column(nullable = false) private boolean read;
    @CreationTimestamp @Column(name = "created_at", nullable = false) private Instant createdAt;
}
