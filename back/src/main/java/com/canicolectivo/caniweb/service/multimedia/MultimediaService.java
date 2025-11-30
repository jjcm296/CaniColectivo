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
    private final StorageService storageService;
    private final CloudflareService cloudflareService;

    public MultimediaService(MultimediaRepository multimediaRepository,
                             StorageService storageService, CloudflareService cloudflareService) {
        this.multimediaRepository = multimediaRepository;
        this.storageService = storageService;
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
            // Subir el archivo a Cloudflare R2 y obtener la URL generada
            String url = cloudflareService.uploadImage(file);

            // Crear una nueva entidad Multimedia con la URL de Cloudflare
            Multimedia entity = new Multimedia(
                    MediaType.IMAGE,
                    url,  // Usar la URL generada por Cloudflare
                    MediaScope.PUBLIC_BANNER
            );

            // Guardar en la base de datos
            Multimedia saved = multimediaRepository.save(entity);

            // Retornar el DTO creado
            return toDTO(saved);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading image to Cloudflare R2", e);
        }
    }

    // ============ OBTENER BANNERS POR TIPO ============
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

    private MultimediaDTO toDTO(Multimedia entity) {
        if (entity == null) return null;

        MultimediaDTO dto = new MultimediaDTO();
        dto.setId(entity.getId());
        dto.setMediaType(entity.getMediaType());
        dto.setUrl(entity.getUrl());
        dto.setScope(entity.getScope());
        dto.setActivo(entity.getActivo());
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

    // segun debe validar que el recurso en la URL responda
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
}
