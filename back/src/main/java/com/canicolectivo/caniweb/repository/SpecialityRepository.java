package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpecialityRepository extends JpaRepository<Speciality, Integer> {
    boolean existsByName(String name);
    Optional<Speciality> findByNameIgnoreCase(String name);
}
