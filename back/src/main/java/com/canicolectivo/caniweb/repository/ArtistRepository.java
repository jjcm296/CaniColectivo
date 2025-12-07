package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
}
