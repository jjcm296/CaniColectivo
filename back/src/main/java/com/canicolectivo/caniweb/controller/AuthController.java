package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.LoginRequestDTO;
import com.canicolectivo.caniweb.dto.LoginResponseDTO;
import com.canicolectivo.caniweb.dto.UserDTO;
import com.canicolectivo.caniweb.dto.UserResponseDTO;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.service.AuthService;
import com.canicolectivo.caniweb.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private AuthService authService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Public registration endpoint:
     * POST /api/register
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserDTO userDTO) {
        Optional<User> created = userService.createUser(userDTO.getEmail(), userDTO.getPassword());
        if (created.isEmpty()) {
            // conflict (invalid input or email already taken)
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

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return authService.login(request.getEmail(), request.getPassword())
                .map(user -> ResponseEntity.ok(LoginResponseDTO.fromUser(user)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}