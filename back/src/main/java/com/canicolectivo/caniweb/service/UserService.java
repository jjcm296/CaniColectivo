package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.dto.UserDTO;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public List<UserDTO> allUsers() {
        return userRepository.findAll()
            .stream()
            .map(UserDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO getCurrentUser(User user) {
        return UserDTO.fromEntity(user);
    }

    
}