package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {

    @Query(value = "SELECT * FROM artists WHERE approved = true ORDER BY RANDOM()", nativeQuery = true)
    List<Artist> findApprovedArtistsRandomOrder();

    // Get limited number of approved artists randomly
    @Query(value = "SELECT * FROM artists WHERE approved = true ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Artist> findRandomApprovedArtists(int limit);

    @Query("SELECT a FROM Artist a JOIN PendingArtist p ON a.id = p.artistId WHERE p.pending = true ORDER BY p.createdAt ASC")
    List<Artist> findPendingArtists();

}
