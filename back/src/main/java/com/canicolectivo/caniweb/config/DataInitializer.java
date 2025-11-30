package com.canicolectivo.caniweb.config;

import com.canicolectivo.caniweb.model.Role;
import com.canicolectivo.caniweb.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        createRoleIfNotExists("admin");
        createRoleIfNotExists("artist");
    }

    private void createRoleIfNotExists(String name) {
        if (name == null || name.trim().isEmpty()) return;
        String trimmed = name.trim();
        if (!roleRepository.existsByName(trimmed)) {
            roleRepository.save(new Role(trimmed));
            log.info("Created role: {}", trimmed);
        } else {
            log.debug("Role already exists: {}", trimmed);
        }
    }
}