package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.Artist;
import com.canicolectivo.caniweb.model.PendingArtist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PendingArtistRepository extends JpaRepository<PendingArtist, Integer> {
    // Find pending artist by artist ID
    Optional<PendingArtist> findByArtistId(Integer artistId);

    // Delete by artist ID (when approved/rejected)
    void deleteByArtistId(Integer artistId);

    // Get all pending artists ordered by creation date (FIFO queue)
    @Query("SELECT p FROM PendingArtist p WHERE p.pending = true ORDER BY p.createdAt ASC")
    List<PendingArtist> findAllPendingOrderedByCreation();

    // Get all pending artists (without order)
    @Query("SELECT p FROM PendingArtist p WHERE p. pending = true")
    List<PendingArtist> findAllPending();

    Integer countByPending(boolean pending);
}
