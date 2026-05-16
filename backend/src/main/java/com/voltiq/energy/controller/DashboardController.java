package com.voltiq.energy.controller;

import com.voltiq.energy.dto.DashboardDtos.DashboardResponse;
import com.voltiq.energy.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    DashboardResponse dashboard() {
        return dashboardService.dashboard();
    }
}
