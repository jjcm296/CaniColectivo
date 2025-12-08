package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.dto.ArtistDTO;
import com.canicolectivo.caniweb.dto.SpecialityDTO;
import com.canicolectivo.caniweb.model.Artist;
import com.canicolectivo.caniweb.model.Speciality;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.repository.ArtistRepository;
import com.canicolectivo.caniweb.repository.SpecialityRepository;
import com.canicolectivo.caniweb.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;
    private final SpecialityRepository specialityRepository;

    public ArtistService(ArtistRepository artistRepository, UserRepository userRepository, SpecialityRepository specialityRepository) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
        this.specialityRepository = specialityRepository;
    }

    public List<ArtistDTO> findAll() {
        return artistRepository.findAll().stream()
                .map(ArtistDTO::formEntity).toList();
    }

    public Optional<ArtistDTO> findById(Integer id) {
        return artistRepository.findById(id).map(ArtistDTO::formEntity);
    }

    private String normalizeName(String name) {
        if (name == null || name.isBlank()) return name;
        name = name.trim();
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }

    @Transactional
    public ArtistDTO create(ArtistDTO dto, User currentUser) {
        User managedUser = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));

        Artist artist = new Artist();

        artist.setName(dto.getName());
        artist.setDescription(dto.getDescription());
        artist.setLocation(dto.getLocation());
        artist.setPhone(dto.getPhone());
        artist.setPhotoUrl(dto.getPhotoUrl());
        artist.setSocialMedia(dto.getSocialMedia());

        // Always bind the artist to the authenticated user
        artist.setUser(managedUser);

        if (dto.getSpecialities() != null && !dto.getSpecialities().isEmpty()) {
            Set<Speciality> specialities = new HashSet<>();

            for (SpecialityDTO sDto : dto.getSpecialities()) {
                Speciality speciality = null;

                if (sDto.getId() != null && sDto.getId() > 0) {
                    speciality = specialityRepository.findById(sDto.getId()).orElse(null);
                }

                if (speciality == null && sDto.getName() != null && !sDto.getName().isBlank()) {
                    String normalized = normalizeName(sDto.getName());
                    speciality = specialityRepository.findByNameIgnoreCase(normalized).orElse(null);
                }

                if (speciality == null) {
                    Speciality newS = sDto.toEntity();
                    newS.setName(normalizeName(newS.getName()));
                    speciality = specialityRepository.save(newS);
                }

                specialities.add(speciality);
            }

            artist.setSpecialities(specialities);
        }

        Artist saved = artistRepository.save(artist);
        return ArtistDTO.formEntity(saved);
    }



    public Optional<ArtistDTO> update(Integer id, ArtistDTO dto) {
        Optional<Artist> opt = artistRepository.findById(id);
        if (opt.isPresent()) {
            Artist artist = opt.get();
            artist.setName(dto.getName());
            artist.setLocation(dto.getLocation());
            artist.setDescription(dto.getDescription());
            artist.setPhone(dto.getPhone());
            artist.setPhotoUrl(dto.getPhotoUrl());
            artist.setSocialMedia(dto.getSocialMedia());

            if (dto.getUserId() != null) {
                userRepository.findById(dto.getUserId()).ifPresent(artist::setUser);
            }

            if (dto.getSpecialities() != null) {
                Set<Speciality> specialities = new HashSet<>();
                for (SpecialityDTO sDto : dto.getSpecialities()) {
                    Speciality speciality = null;
                    if (sDto.getId() > 0) {
                        speciality = specialityRepository.findById(sDto.getId()).orElse(null);
                    }
                    if (speciality == null && sDto.getName() != null && !sDto.getName().isBlank()) {
                        String normalized = normalizeName(sDto.getName());
                        Optional<Speciality> byName = specialityRepository.findByNameIgnoreCase(normalized);
                        if (byName.isPresent()) speciality = byName.get();
                    }
                    if (speciality == null) {
                        Speciality newS = sDto.toEntity();
                        newS.setName(normalizeName(newS.getName()));
                        speciality = specialityRepository.save(newS);
                    }
                    specialities.add(speciality);
                }
                artist.setSpecialities(specialities);
            }

            Artist saved = artistRepository.save(artist);
            return Optional.of(ArtistDTO.formEntity(saved));
        }
        return Optional.empty();
    }


    public boolean delete (Integer id){
        if (artistRepository.existsById(id)) {
                artistRepository.deleteById(id);
                return true;
        }
        return false;
    }





}
