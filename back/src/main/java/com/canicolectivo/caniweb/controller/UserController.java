package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.UserDTO;
import com.canicolectivo.caniweb.dto.UserResponseDTO;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Integer id) {
        return userService.getUser(id)
                .map(user -> new UserResponseDTO(user.getId(), user.getEmail()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        Optional<User> created = userService.createUser(userDTO.getEmail(), userDTO.getPassword());
        if (created.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        User u = created.get();
        UserResponseDTO response = new UserResponseDTO(u.getId(), u.getEmail());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(u.getId())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }
}