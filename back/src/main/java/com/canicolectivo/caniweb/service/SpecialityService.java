package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.dto.SpecialityDTO;
import com.canicolectivo.caniweb.model.Speciality;
import com.canicolectivo.caniweb.repository.SpecialityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialityService {
    private final SpecialityRepository specialityRepository;

    public SpecialityService(SpecialityRepository specialityRepository) {
        this.specialityRepository = specialityRepository;
    }

    public List<SpecialityDTO> findAll() {
        return specialityRepository.findAll().stream().map(SpecialityDTO::formEntity).toList();
    }

    public Optional<SpecialityDTO> findById(Integer id) {
        return specialityRepository.findById(id).map(SpecialityDTO::formEntity);
    }

    public SpecialityDTO create(SpecialityDTO dto) {
        Speciality entity = dto.toEntity();
        entity.setName(normalizeName(entity.getName()));
        return SpecialityDTO.formEntity(specialityRepository.save(entity));
    }

    public Optional<SpecialityDTO> update(Integer id, SpecialityDTO dto) {
        Optional<Speciality> opt = specialityRepository.findById(id);
        if (opt.isPresent()) {
            Speciality entity = opt.get();
            entity.setName(normalizeName(dto.getName()));
            entity.setType(dto.getType());
            return Optional.of(SpecialityDTO.formEntity(specialityRepository.save(entity)));
        }
        return Optional.empty();
    }

    public boolean delete(Integer id) {
        if (specialityRepository.existsById(id)) {
            specialityRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private String normalizeName(String name) {
        if (name == null || name.isBlank()) return name;
        name = name.trim();
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }
}
