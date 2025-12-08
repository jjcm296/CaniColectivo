package com.canicolectivo.caniweb.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name= "pending_artists")
public class PendingArtist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "artist_id", nullable = false)
    private Integer artistId;

    @Column(name = "pending", nullable = false)
    private boolean pending = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public PendingArtist() {}

    public PendingArtist(Integer artistId, LocalDateTime createdAt) {
        this.artistId = artistId;
        this.createdAt = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public boolean isPending() {
        return pending;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Integer getArtistId() {
        return artistId;
    }

    public void setArtistId(Integer artistId) {
        this.artistId = artistId;
    }
}
