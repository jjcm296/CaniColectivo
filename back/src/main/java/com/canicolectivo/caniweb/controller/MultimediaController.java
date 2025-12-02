package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.multimedia.BannerVideoRequestDTO;
import com.canicolectivo.caniweb.dto.multimedia.MultimediaDTO;
import com.canicolectivo.caniweb.service.multimedia.MultimediaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/multimedia")
public class MultimediaController {

    private final MultimediaService multimediaService;

    public MultimediaController(MultimediaService multimediaService) {
        this.multimediaService = multimediaService;
    }

    // ======= IMAGENES BANNER PÚBLICO =======
    // subir imagen de banner
    @PostMapping("/banner/image")
    public ResponseEntity<MultimediaDTO> uploadBannerImage(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        MultimediaDTO created = multimediaService.createBannerImage(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // obtener lista de imágenes de banner público (todas las activas, sin filtrar featured)
    @GetMapping("/banner/image")
    public ResponseEntity<List<MultimediaDTO>> getBannerImages() {
        return ResponseEntity.ok(multimediaService.getPublicBannerImages());
    }

    // =====SECCIONES EN EL FRONT =====
    // Activas y NO destacadas (sección "Todas")
    @GetMapping("/banner/image/active")
    public ResponseEntity<List<MultimediaDTO>> getActiveNonFeaturedBannerImages() {
        return ResponseEntity.ok(multimediaService.getActiveNonFeaturedBannerImages());
    }

    // Activas y destacadas (sección "Destacadas")
    @GetMapping("/banner/image/featured")
    public ResponseEntity<List<MultimediaDTO>> getFeaturedBannerImages() {
        return ResponseEntity.ok(multimediaService.getFeaturedBannerImages());
    }

    // NO activas (sección "No activas")
    @GetMapping("/banner/image/inactive")
    public ResponseEntity<List<MultimediaDTO>> getInactiveBannerImages() {
        return ResponseEntity.ok(multimediaService.getInactiveBannerImages());
    }

    // ======= VIDEOS BANNER PÚBLICO =======
    // subir video mediante URL
    @PostMapping("/banner/video")
    public ResponseEntity<MultimediaDTO> createBannerVideo(
            @Valid @RequestBody BannerVideoRequestDTO request) {

        MultimediaDTO created = multimediaService.createBannerVideo(request.getUrl());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // obtener lista de videos de banner público
    @GetMapping("/banner/video")
    public ResponseEntity<List<MultimediaDTO>> getBannerVideos() {
        return ResponseEntity.ok(multimediaService.getPublicBannerVideos());
    }

    // ===== MULTIMEDIA GENERAL =====
    // Eliminar multimedia por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMultimedia(@PathVariable Long id) {
        multimediaService.deleteMultimedia(id);
        return ResponseEntity.noContent().build();
    }

    // Alternar el estado destacado de una multimedia
    @PatchMapping("/{id}/featured/toggle")
    public ResponseEntity<MultimediaDTO> toggleFeatured(@PathVariable Long id) {
        MultimediaDTO updated = multimediaService.toggleFeatured(id);
        return ResponseEntity.ok(updated);
    }

    // Alternar el estado activo/inactivo de una multimedia
    @PatchMapping("/{id}/active/toggle")
    public ResponseEntity<MultimediaDTO> toggleActive(@PathVariable Long id) {
        MultimediaDTO updated = multimediaService.toggleActive(id);
        return ResponseEntity.ok(updated);
    }
}
