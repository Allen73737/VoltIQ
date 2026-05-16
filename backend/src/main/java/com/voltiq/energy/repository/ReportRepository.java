package com.voltiq.energy.repository;

import com.voltiq.energy.entity.Report;
import com.voltiq.energy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReportRepository extends JpaRepository<Report, UUID> {
    List<Report> findByUserOrderByCreatedAtDesc(User user);
}
