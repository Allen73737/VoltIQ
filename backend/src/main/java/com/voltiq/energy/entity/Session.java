package com.voltiq.energy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "sessions")
public class Session {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private User user;
    @Column(name = "jwt_id", nullable = false) private String jwtId;
    @Column(name = "issued_at", nullable = false) private Instant issuedAt;
    @Column(name = "expires_at", nullable = false) private Instant expiresAt;
    @Column(nullable = false) private boolean revoked;
}
