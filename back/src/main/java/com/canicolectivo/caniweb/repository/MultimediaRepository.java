package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.Enum.multimedia.MediaScope;
import com.canicolectivo.caniweb.Enum.multimedia.MediaType;
import com.canicolectivo.caniweb.model.Multimedia;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MultimediaRepository extends JpaRepository<Multimedia, Long> {

    List<Multimedia> findByScopeAndActivoTrue(MediaScope scope);

    Optional<Multimedia> findByIdAndActivoTrue(Long id);

    List<Multimedia> findByScopeAndMediaTypeAndActivoTrue(MediaScope scope, MediaType mediaType);

    // Activas y NO destacadas
    List<Multimedia> findByScopeAndMediaTypeAndActivoTrueAndIsFeaturedFalse(
            MediaScope scope,
            MediaType mediaType
    );

    // Activas y destacadas
    List<Multimedia> findByScopeAndMediaTypeAndActivoTrueAndIsFeaturedTrue(
            MediaScope scope,
            MediaType mediaType
    );

    // NO activas (independientemente de si son destacadas)
    List<Multimedia> findByScopeAndMediaTypeAndActivoFalse(
            MediaScope scope,
            MediaType mediaType
    );
}