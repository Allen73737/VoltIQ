package com.voltiq.energy.repository;

import com.voltiq.energy.entity.Alert;
import com.voltiq.energy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AlertRepository extends JpaRepository<Alert, UUID> {
    List<Alert> findTop10ByUserOrderByCreatedAtDesc(User user);
}
