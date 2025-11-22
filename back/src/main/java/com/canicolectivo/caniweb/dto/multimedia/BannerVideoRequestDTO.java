package com.canicolectivo.caniweb.dto.multimedia;

public class BannerVideoRequestDTO {

    private String url;

    public BannerVideoRequestDTO() {
    }

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
