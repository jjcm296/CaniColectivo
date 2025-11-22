package com.canicolectivo.caniweb.dto.multimedia;

import com.canicolectivo.caniweb.Enum.multimedia.MediaScope;
import com.canicolectivo.caniweb.Enum.multimedia.MediaType;

import java.time.LocalDateTime;

public class MultimediaDTO {
    private Long id;
    private MediaType mediaType;
    private String url;
    private MediaScope Scope;
    Boolean activo;
    private LocalDateTime createdAt;

    public MultimediaDTO() {}

    public MultimediaDTO(Long id, MediaType mediaType, String url, MediaScope scope, Boolean activo, LocalDateTime createdAt) {
        this.id = id;
        this.mediaType = mediaType;
        this.url = url;
        Scope = scope;
        this.activo = activo;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public void setMediaType(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MediaScope getScope() {
        return Scope;
    }

    public void setScope(MediaScope scope) {
        Scope = scope;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
