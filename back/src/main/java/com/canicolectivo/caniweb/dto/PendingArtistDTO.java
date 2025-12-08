package com.canicolectivo.caniweb.dto;

import com.canicolectivo. caniweb.model.Artist;
import com.canicolectivo.caniweb.model.PendingArtist;

import java.time.LocalDateTime;

public class PendingArtistDTO {
    private Integer pendingId;
    private ArtistDTO artist;
    private LocalDateTime createdAt;

    public PendingArtistDTO(Integer pendingId, ArtistDTO artist, LocalDateTime createdAt) {
        this.pendingId = pendingId;
        this.artist = artist;
        this.createdAt = createdAt;
    }

    public static PendingArtistDTO create(PendingArtist pendingArtist, Artist artist) {
        return new PendingArtistDTO(
                pendingArtist.getId(),
                ArtistDTO.formEntity(artist),
                pendingArtist.getCreatedAt()
        );
    }

    public Integer getPendingId() { return pendingId; }
    public ArtistDTO getArtist() { return artist; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}