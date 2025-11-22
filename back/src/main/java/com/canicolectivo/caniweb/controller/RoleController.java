package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.RoleDTO;
import com.canicolectivo.caniweb.model.Role;
import com.canicolectivo.caniweb.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@Valid @RequestBody RoleDTO roleDTO) {
        Optional<Role> created = roleService.createRole(roleDTO.getName());
        if (created.isEmpty()) {
            // Role already exists or invalid input
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Role r = created.get();
        RoleDTO response = new RoleDTO(r.getId(), r.getName());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(r.getId())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable Integer id) {
        return roleService.getRole(id)
                .map(r -> new RoleDTO(r.getId(), r.getName()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Optional endpoints to help manage roles

    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO> updateRole(@PathVariable Integer id, @Valid @RequestBody RoleDTO roleDTO) {
        Optional<Role> updated = roleService.updateRole(id, roleDTO.getName());
        return updated
                .map(r -> new RoleDTO(r.getId(), r.getName()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Integer id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
