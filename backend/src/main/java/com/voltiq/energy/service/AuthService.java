package com.voltiq.energy.service;

import com.voltiq.energy.dto.AuthDtos.*;
import com.voltiq.energy.entity.Role;
import com.voltiq.energy.entity.User;
import com.voltiq.energy.exception.ApiException;
import com.voltiq.energy.repository.UserRepository;
import com.voltiq.energy.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email already registered");
        }
        User user = userRepository.save(User.builder()
                .name(request.name())
                .email(request.email())
                .organization(request.organization())
                .role(Role.ADMIN)
                .passwordHash(passwordEncoder.encode(request.password()))
                .build());
        return response(user);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = userRepository.findByEmail(request.email()).orElseThrow();
        return response(user);
    }

    private AuthResponse response(User user) {
        return new AuthResponse(jwtService.generate(user), new UserResponse(
                user.getId().toString(), user.getName(), user.getEmail(), user.getRole().name(), user.getOrganization()));
    }
}
