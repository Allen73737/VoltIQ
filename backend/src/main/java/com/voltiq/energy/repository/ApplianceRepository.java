package com.voltiq.energy.repository;

import com.voltiq.energy.entity.Appliance;
import com.voltiq.energy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplianceRepository extends JpaRepository<Appliance, UUID> {
    List<Appliance> findByUserOrderByCreatedAtDesc(User user);
}
