package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.artist.ApproveArtistDTO;
import com.canicolectivo.caniweb.dto.artist.ArtistDTO;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.responses.ArtistPhotoResponse;
import com.canicolectivo.caniweb.service.ArtistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/artists")
@RestController
public class ArtistController {
    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping
    public List<ArtistDTO> getAllApproved() {
        return artistService.findAllApprovedRandom();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ArtistDTO> getAll() {
        return artistService.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<ArtistDTO> getById(@PathVariable Integer id) {
        return artistService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ArtistDTO> create(Authentication authentication, @RequestBody ArtistDTO dto) {
        User currentUser = (User) authentication.getPrincipal();

        ArtistDTO created = artistService.create(dto, currentUser);

        return ResponseEntity.status(201).body(created);
    }

    @PostMapping("/{id}/photo")
    public ResponseEntity<ArtistPhotoResponse> uploadPhoto(@PathVariable Integer id,
                                                           @RequestParam("photo")MultipartFile file,
                                                           Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();

        ArtistPhotoResponse response = artistService.uploadArtistPhoto(id, file, currentUser);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtistDTO> update(@PathVariable Integer id, @RequestBody ArtistDTO dto, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return artistService.update(id, dto, currentUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable Integer id, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();

        boolean deleted = artistService.delete(id, currentUser);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ArtistDTO> getPending() {
        return artistService.findPendingArtists();

    }

    @GetMapping("/pending/count")
    @PreAuthorize("hasRole('ADMIN')")
    public Integer countPending() {
        return artistService.getPendingCount();
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approve(@PathVariable Integer id, @Valid @RequestBody ApproveArtistDTO approveArtistDTO) {
        try {
            boolean result = artistService.processApproval(id, approveArtistDTO.getApproved());

            if (approveArtistDTO.getApproved()) {
                return result ? ResponseEntity.ok("Artist is approved") : ResponseEntity.badRequest().build();
            } else {
                return ResponseEntity.ok("Artist was rejected");
            }
        } catch (Exception e) {
            return ResponseEntity. badRequest().body("Error processing approval: " + e.getMessage());        }
    }



}
