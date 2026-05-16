package com.voltiq.energy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public record RegisterRequest(@NotBlank String name, @Email String email, @NotBlank String password, @NotBlank String organization) {}
    public record LoginRequest(@Email String email, @NotBlank String password) {}
    public record UserResponse(String id, String name, String email, String role, String organization) {}
    public record AuthResponse(String token, UserResponse user) {}
}
