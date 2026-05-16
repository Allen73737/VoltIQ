package com.voltiq.energy.controller;

import com.voltiq.energy.dto.ApplianceDtos.*;
import com.voltiq.energy.service.ApplianceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/appliances")
@RequiredArgsConstructor
public class ApplianceController {
    private final ApplianceService applianceService;

    @GetMapping
    Page<ApplianceResponse> list(Pageable pageable) {
        var all = applianceService.list();
        int start = (int) Math.min(pageable.getOffset(), all.size());
        int end = Math.min(start + pageable.getPageSize(), all.size());
        return new PageImpl<>(all.subList(start, end), pageable, all.size());
    }

    @PostMapping
    ApplianceResponse create(@Valid @RequestBody ApplianceRequest request) {
        return applianceService.create(request);
    }

    @PostMapping("/{id}/start")
    ApplianceResponse start(@PathVariable UUID id) {
        return applianceService.start(id);
    }

    @PostMapping("/{id}/stop")
    ApplianceResponse stop(@PathVariable UUID id) {
        return applianceService.stop(id);
    }
}
