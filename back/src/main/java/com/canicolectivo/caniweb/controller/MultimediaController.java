package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.dto.multimedia.BannerVideoRequestDTO;
import com.canicolectivo.caniweb.dto.multimedia.MultimediaDTO;
import com.canicolectivo.caniweb.service.multimedia.MultimediaService;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/multimedia")
public class MultimediaController {

    private final MultimediaService multimediaService;

    public MultimediaController(MultimediaService multimediaService) {
        this.multimediaService = multimediaService;
    }

    // ============ CREAR BANNER VIDEO (Url) ============
    @PostMapping("/banner/video")
    public ResponseEntity<MultimediaDTO> createBannerVideo(
            @RequestBody BannerVideoRequestDTO request) {

        if (request == null || request.getUrl() == null || request.getUrl().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "URL is required"
            );
        }

        MultimediaDTO created = multimediaService.createBannerVideo(request.getUrl());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ============ CREAR BANNER IMAGEN (file) ===========
    @PostMapping("/banner/image")
    public ResponseEntity<MultimediaDTO> uploadBannerImage (@RequestParam("file") MultipartFile file) {

        MultimediaDTO created = multimediaService.createBannerImage(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ============ OBTENER SOLO IMÁGENES ============
    @GetMapping("/banner/image")
    public ResponseEntity<List<MultimediaDTO>> getBannerImages() {
        return ResponseEntity.ok(multimediaService.getPublicBannerImages());
    }

    // ============ OBTENER SOLO VIDEOS ============
    @GetMapping("/banner/video")
    public ResponseEntity<List<MultimediaDTO>> getBannerVideos() {
        return ResponseEntity.ok(multimediaService.getPublicBannerVideos());
    }
}
