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
    // obtener lista de imágenes de banner público
    @GetMapping("/banner/image")
    public ResponseEntity<List<MultimediaDTO>> getBannerImages() {
        return ResponseEntity.ok(multimediaService.getPublicBannerImages());
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
}
