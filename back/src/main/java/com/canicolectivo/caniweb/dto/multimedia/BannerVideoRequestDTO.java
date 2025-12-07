package com.canicolectivo.caniweb.dto.multimedia;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BannerVideoRequestDTO {

    @NotBlank(message = "URL is required")
    @Size(min = 5, message = "URL is too short")
    private String url;

    public BannerVideoRequestDTO() {}

    public BannerVideoRequestDTO(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
