package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.artist.ApproveArtistDTO;
import com.canicolectivo.caniweb.dto.artist.ArtistDTO;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.service.ArtistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{id}")
    public ResponseEntity<ArtistDTO> update(@PathVariable Integer id, @RequestBody ArtistDTO dto) {
        return artistService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        boolean deleted = artistService.delete(id);
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
