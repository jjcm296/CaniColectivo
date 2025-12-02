package com.canicolectivo.caniweb.config;

import com.canicolectivo.caniweb.model.Role;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.repository.RoleRepository;
import com.canicolectivo.caniweb.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class AdminUserInitializer implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@local}")
    private String adminEmail;

    private String adminUsername = "Administrador";

    @Value("${app.admin.password:admin123}")
    private String adminPassword;

    public AdminUserInitializer(PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        try {
            if (userRepository.existsByEmail(adminEmail)) {
                log.info("Admin user already exists {}", adminEmail);
                return;
            }

            Optional<Role> adminRoleOption = roleRepository.findAll()
                    .stream()
                    .filter(r -> "admin".equalsIgnoreCase(r.getName()))
                    .findFirst();
            Role adminRole = adminRoleOption.orElseGet(() -> roleRepository.save(new Role("admin")));

            User admin = new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword));
            admin.setEnabled(true);
            admin.addRole(adminRole);

            userRepository.save(admin);
            log.info("Created admin user {}", adminEmail);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
