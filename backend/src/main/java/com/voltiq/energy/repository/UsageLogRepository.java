package com.voltiq.energy.repository;

import com.voltiq.energy.entity.Appliance;
import com.voltiq.energy.entity.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

public interface UsageLogRepository extends JpaRepository<UsageLog, UUID> {
    Optional<UsageLog> findFirstByApplianceAndEndedAtIsNullOrderByStartedAtDesc(Appliance appliance);

    @Query("select coalesce(sum(u.unitsConsumed), 0) from UsageLog u where u.appliance.user.id = :userId")
    BigDecimal totalUnitsForUser(UUID userId);

    @Query("select coalesce(sum(u.unitsConsumed), 0) from UsageLog u where u.appliance.id = :applianceId")
    BigDecimal totalUnitsForAppliance(UUID applianceId);
}
