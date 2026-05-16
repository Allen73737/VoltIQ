package com.voltiq.energy.config;

import com.voltiq.energy.entity.Appliance;
import com.voltiq.energy.entity.Role;
import com.voltiq.energy.entity.User;
import com.voltiq.energy.repository.ApplianceRepository;
import com.voltiq.energy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final UserRepository userRepository;
    private final ApplianceRepository applianceRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedVoltIqDemo() {
        return args -> {
            if (userRepository.existsByEmail("admin@voltiq.io")) return;
            User user = userRepository.save(User.builder()
                    .name("Aarav Mehta")
                    .email("admin@voltiq.io")
                    .passwordHash(passwordEncoder.encode("password123"))
                    .role(Role.ADMIN)
                    .organization("VoltIQ Demo Campus")
                    .build());
            applianceRepository.save(Appliance.builder().user(user).name("Conference HVAC").zone("Tower A").powerRatingKw(BigDecimal.valueOf(2.4)).active(false).build());
            applianceRepository.save(Appliance.builder().user(user).name("Laundry Bay 02").zone("Hostel East").powerRatingKw(BigDecimal.valueOf(1.8)).active(false).build());
            applianceRepository.save(Appliance.builder().user(user).name("Studio Lighting").zone("Creative Lab").powerRatingKw(BigDecimal.valueOf(0.9)).active(false).build());
        };
    }
}
