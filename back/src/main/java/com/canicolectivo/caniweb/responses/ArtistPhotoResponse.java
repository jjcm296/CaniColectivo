package com.canicolectivo.caniweb.responses;

import com.canicolectivo.caniweb.dto.artist.ArtistDTO;

public class ArtistPhotoResponse {
    private String photoUrl;
    private ArtistDTO artist;

    public ArtistPhotoResponse(String photoUrl, ArtistDTO artist) {
        this.photoUrl = photoUrl;
        this.artist = artist;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public ArtistDTO getArtist() {
        return artist;
    }

    public void setArtist(ArtistDTO artist) {
        this.artist = artist;
    }
}
