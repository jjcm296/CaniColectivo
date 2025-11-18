package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.model.Role;
import com.canicolectivo.caniweb.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRole(Integer id) {
        return roleRepository.findById(id);
    }

    @Transactional
    public Optional<Role> createRole(String name) {
        if (name == null || name.trim().isEmpty()) {
            return Optional.empty();
        }
        if (roleRepository.existsByName(name.trim())) {
            return Optional.empty();
        }
        Role role = new Role(name.trim());
        return Optional.of(roleRepository.save(role));
    }

    @Transactional
    public Optional<Role> updateRole(Integer id, String newName) {
        return roleRepository.findById(id).map(role -> {
            role.setName(newName);
            return roleRepository.save(role);
        });
    }

    @Transactional
    public void deleteRole(Integer id) {
        roleRepository.deleteById(id);
    }
}
