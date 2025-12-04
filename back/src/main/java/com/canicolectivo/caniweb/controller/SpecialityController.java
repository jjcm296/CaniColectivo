package com.canicolectivo.caniweb.controller;

import com.canicolectivo.caniweb.Enum.TypeSpeciality;
import com.canicolectivo.caniweb.dto.SpecialityDTO;
import com.canicolectivo.caniweb.service.SpecialityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/specialities")
@RestController
public class SpecialityController {
    private final SpecialityService specialityService;

    public SpecialityController(SpecialityService specialityService) {
        this.specialityService = specialityService;
    }

    @GetMapping
    public List<SpecialityDTO> getAll() {
        return specialityService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialityDTO> getById(@PathVariable int id) {
        return specialityService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SpecialityDTO> create(@RequestBody SpecialityDTO dto) {
        SpecialityDTO created = specialityService.create(dto);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecialityDTO> update(@PathVariable Integer id, @RequestBody SpecialityDTO dto) {
        return specialityService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        boolean deleted = specialityService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/types")
    public TypeSpeciality[] getAllTypes() {
        return TypeSpeciality.values();
    }
}
