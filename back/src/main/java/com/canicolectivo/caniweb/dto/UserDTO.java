package com.canicolectivo.caniweb.dto;

import com.canicolectivo.caniweb.dto.artist.ArtistDTO;
import com.canicolectivo.caniweb.model.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private Set<RoleDTO> roles;
    private ArtistDTO artist;
    private boolean enabled;

    public UserDTO() {}

    public UserDTO(Integer id, String username, String email, Set<RoleDTO> roles, ArtistDTO artist, boolean enabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.artist = artist;
        this.enabled = enabled;
    }

    public static UserDTO fromEntity(User user) {
        Set<RoleDTO> roleDTOs = user.getRoles().stream()
                .map(role -> new RoleDTO(role.getId(), role.getName()))
                .collect(Collectors.toSet());

        // Convert the full artist entity to ArtistDTO if present
        ArtistDTO artistDTO = user.getArtist() != null ? ArtistDTO.formEntity(user.getArtist()) : null;

        return new UserDTO(
                user.getId(),
                user.getUsernameNotOverriden(),
                user. getEmail(),
                roleDTOs,
                artistDTO,
                user.isEnabled()
        );
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDTO> roles) {
        this.roles = roles;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public ArtistDTO getArtist() {
        return artist;
    }

    public void setArtist(ArtistDTO artist) {
        this.artist = artist;
    }
}
