package com.canicolectivo.caniweb.service.multimedia;

import com.canicolectivo.caniweb.Enum.multimedia.MediaScope;
import com.canicolectivo.caniweb.Enum.multimedia.MediaType;
import com.canicolectivo.caniweb.dto.multimedia.MultimediaDTO;
import com.canicolectivo.caniweb.model.Multimedia;
import com.canicolectivo.caniweb.repository.MultimediaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MultimediaService {

    private final MultimediaRepository multimediaRepository;
    private final CloudflareService cloudflareService;

    public MultimediaService(MultimediaRepository multimediaRepository, CloudflareService cloudflareService) {
        this.multimediaRepository = multimediaRepository;
        this.cloudflareService = cloudflareService;
    }

    // ============ VIDEO (URL) ============
    public MultimediaDTO createBannerVideo(String url) {

        if (url == null || url.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "URL is required");
        }

        url = url.trim();

        if (!isValidUrlFormat(url)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "URL format is invalid"
            );
        }

        if (!urlExists(url)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "URL does not respond or is unreachable"
            );
        }

        Multimedia entity = new Multimedia(
                MediaType.VIDEO,
                url,
                MediaScope.PUBLIC_BANNER
        );

        Multimedia saved = multimediaRepository.save(entity);
        return toDTO(saved);
    }

    // ============ IMAGEN (FILE) ============
    public MultimediaDTO createBannerImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file is required");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");
        }

        try {
            String url = cloudflareService.uploadImage(file);

            Multimedia entity = new Multimedia(
                    MediaType.IMAGE,
                    url,
                    MediaScope.PUBLIC_BANNER
            );
            Multimedia saved = multimediaRepository.save(entity);
            return toDTO(saved);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading image to Cloudflare R2", e);
        }
    }

    // ============ OBTENER BANNERS POR TIPO (EXISTENTES) ============
    // Esta sigue devolviendo TODAS las imágenes activas, sin filtrar featured
    public List<MultimediaDTO> getPublicBannerImages() {
        return multimediaRepository
                .findByScopeAndMediaTypeAndActivoTrue(MediaScope.PUBLIC_BANNER, MediaType.IMAGE)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MultimediaDTO> getPublicBannerVideos() {
        return multimediaRepository
                .findByScopeAndMediaTypeAndActivoTrue(MediaScope.PUBLIC_BANNER, MediaType.VIDEO)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ============ NUEVOS MÉTODOS PARA SECCIONES EN EL FRONT ============

    /**
     * Imágenes de banner:
     * - Activas
     * - NO destacadas
     */
    public List<MultimediaDTO> getActiveNonFeaturedBannerImages() {
        return multimediaRepository
                .findByScopeAndMediaTypeAndActivoTrueAndIsFeaturedFalse(
                        MediaScope.PUBLIC_BANNER,
                        MediaType.IMAGE
                )
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Imágenes de banner:
     * - Activas
     * - Destacadas
     */
    public List<MultimediaDTO> getFeaturedBannerImages() {
        return multimediaRepository
                .findByScopeAndMediaTypeAndActivoTrueAndIsFeaturedTrue(
                        MediaScope.PUBLIC_BANNER,
                        MediaType.IMAGE
                )
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Imágenes de banner:
     * - NO activas
     */
    public List<MultimediaDTO> getInactiveBannerImages() {
        return multimediaRepository
                .findByScopeAndMediaTypeAndActivoFalse(
                        MediaScope.PUBLIC_BANNER,
                        MediaType.IMAGE
                )
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ============ MAPPER ============
    private MultimediaDTO toDTO(Multimedia entity) {
        if (entity == null) return null;

        MultimediaDTO dto = new MultimediaDTO();
        dto.setId(entity.getId());
        dto.setMediaType(entity.getMediaType());
        dto.setUrl(entity.getUrl());
        dto.setScope(entity.getScope());
        dto.setActivo(entity.getActivo());
        dto.setIsFeatured(entity.getIsFeatured());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    // Valida el formato general de la URL
    private boolean isValidUrlFormat(String url) {
        try {
            new URL(url).toURI();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // valida que el recurso en la URL responda
    private boolean urlExists(String url) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("HEAD");
            connection.setConnectTimeout(3000);
            connection.setReadTimeout(3000);
            int responseCode = connection.getResponseCode();

            return (200 <= responseCode && responseCode <= 399);

        } catch (Exception e) {
            return false;
        }
    }

    // ============ ELIMINAR MULTIMEDIA (IMAGEN O VIDEO) ============
    public void deleteMultimedia(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Multimedia with id " + id + " not found"
                        )
                );

        if (multimedia.getMediaType() == MediaType.IMAGE) {
            String url = multimedia.getUrl();
            try {
                cloudflareService.deleteByUrl(url);
            } catch (IOException e) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Error deleting image from Cloudflare R2",
                        e
                );
            }
        }

        multimediaRepository.delete(multimedia);
    }

    // ============ ACTUALIZAR DESTACADO ============
    public MultimediaDTO toggleFeatured(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Multimedia with id " + id + " not found"
                        )
                );

        boolean newValue = !multimedia.getIsFeatured();
        multimedia.setIsFeatured(newValue);

        Multimedia saved = multimediaRepository.save(multimedia);
        return toDTO(saved);
    }

    // ============ ACTUALIZAR ACTIVO / INACTIVO ============
    public MultimediaDTO toggleActive(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Multimedia with id " + id + " not found"
                        )
                );

        // Si está activo, lo desactiva; si está inactivo, lo activa
        boolean newValue = !Boolean.TRUE.equals(multimedia.getActivo());
        multimedia.setActivo(newValue);

        Multimedia saved = multimediaRepository.save(multimedia);
        return toDTO(saved);
    }
}
