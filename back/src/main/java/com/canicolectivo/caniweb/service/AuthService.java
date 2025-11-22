package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Attempts to authenticate a user with the given email and password.
     *
     * NOTE: Passwords are compared in plain-text for now because the project currently
     * stores plaintext passwords. Replace this with a PasswordEncoder (BCrypt) when
     * introducing proper authentication.
     *
     * @param email the user's email
     * @param password the raw password
     * @return Optional<User> present when authentication succeeds
     */
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> login(String email, String password) {
        if (email == null || email.trim().isEmpty()) {
            return Optional.empty();
        }
        if (password == null || password.trim().isEmpty()) {
            return Optional.empty();
        }

        String normalizedEmail = email.trim().toLowerCase();
        Optional<User> maybeUser = userRepository.findByEmail(normalizedEmail);
        if (maybeUser.isEmpty()) {
            return Optional.empty();
        }

        User user = maybeUser.get();
        // TODO: use a password encoder (e.g. BCryptPasswordEncoder) instead of plain-text comparison.
        if (!user.getPassword().equals(password)) {
            return Optional.empty();
        }

        return Optional.of(user);
    }
}