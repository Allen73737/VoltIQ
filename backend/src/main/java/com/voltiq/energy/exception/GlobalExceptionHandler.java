package com.voltiq.energy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    ResponseEntity<Map<String, Object>> api(ApiException ex) {
        return ResponseEntity.status(ex.status()).body(body(ex.status(), ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Map<String, Object>> validation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (a, b) -> a))
                .toString();
        return ResponseEntity.badRequest().body(body(HttpStatus.BAD_REQUEST, message));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<Map<String, Object>> generic(Exception ex) {
        return ResponseEntity.internalServerError().body(body(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected VoltIQ service error"));
    }

    private Map<String, Object> body(HttpStatus status, String message) {
        return Map.of("timestamp", Instant.now(), "status", status.value(), "error", status.getReasonPhrase(), "message", message);
    }
}
