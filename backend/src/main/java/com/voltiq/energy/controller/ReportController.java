package com.voltiq.energy.controller;

import com.voltiq.energy.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/export.csv")
    ResponseEntity<String> csv() {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=voltiq-report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(reportService.csv());
    }

    @GetMapping("/export.pdf")
    ResponseEntity<byte[]> pdf() {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=voltiq-report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(reportService.pdfPlaceholder());
    }
}
