package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.model.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialityRepository extends JpaRepository<Speciality, Integer> {
    boolean existsByName(String name);
}
