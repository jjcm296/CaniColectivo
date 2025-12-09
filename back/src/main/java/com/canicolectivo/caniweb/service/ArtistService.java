package com.canicolectivo.caniweb.service;

import com.canicolectivo.caniweb.dto.artist.ArtistDTO;
import com.canicolectivo.caniweb.dto.artist.SpecialityDTO;
import com.canicolectivo.caniweb.model.Artist;
import com.canicolectivo.caniweb.model.PendingArtist;
import com.canicolectivo.caniweb.model.Speciality;
import com.canicolectivo.caniweb.model.User;
import com.canicolectivo.caniweb.repository.ArtistRepository;
import com.canicolectivo.caniweb.repository.PendingArtistRepository;
import com.canicolectivo.caniweb.repository.SpecialityRepository;
import com.canicolectivo.caniweb.repository.UserRepository;
import com.canicolectivo.caniweb.responses.ArtistPhotoResponse;
import com.canicolectivo.caniweb.service.multimedia.CloudflareService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;
    private final SpecialityRepository specialityRepository;
    private final PendingArtistRepository pendingArtistRepository;
    private final CloudflareService cloudflareService;

    public ArtistService(ArtistRepository artistRepository,
                         UserRepository userRepository,
                         SpecialityRepository specialityRepository,
                         PendingArtistRepository pendingArtistRepository,
                         CloudflareService cloudflareService
    ) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
        this.specialityRepository = specialityRepository;
        this.pendingArtistRepository = pendingArtistRepository;
        this.cloudflareService = cloudflareService;
    }

    public List<ArtistDTO> findAll() {
        return artistRepository.findAll().stream()
                .map(ArtistDTO::formEntity).toList();
    }

    public List<ArtistDTO> findAllApprovedRandom() {
        return artistRepository.findApprovedArtistsRandomOrder(). stream()
                . map(ArtistDTO::formEntity).toList();
    }

    public List<ArtistDTO> findAllApprovedRandom(int limit) {
        if (limit <= 0) {
            return List.of();
        }
        return artistRepository.findRandomApprovedArtists(limit). stream()
                . map(ArtistDTO::formEntity).toList();
    }

    public List<ArtistDTO> findPendingArtists() {
        return artistRepository.findPendingArtists().stream()
                .map(ArtistDTO::formEntity)
                .toList();
    }

    public Integer getPendingCount() {
        return pendingArtistRepository.countByPending(true);
    }

    public Optional<ArtistDTO> findById(Integer id) {
        return artistRepository.findById(id).map(ArtistDTO::formEntity);
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
        artist.setUser(managedUser);

        // ---- HANDLE SPECIALITIES ----
        if (dto.getSpecialities() != null && !dto.getSpecialities().isEmpty()) {
            Set<Speciality> specialities = new HashSet<>();

            for (SpecialityDTO sDto : dto.getSpecialities()) {

                // ignore empty speciality rows
                if ((sDto.getId() == null || sDto.getId() <= 0)
                        && (sDto.getName() == null || sDto.getName().isBlank())) {
                    continue;
                }

                Speciality speciality = null;

                // 1) Try by ID
                if (sDto.getId() != null && sDto.getId() > 0) {
                    speciality = specialityRepository.findById(sDto.getId()).orElse(null);
                }

                // 2) Try by name
                if (speciality == null && sDto.getName() != null && !sDto.getName().isBlank()) {
                    String normalized = normalizeName(sDto.getName());
                    speciality = specialityRepository.findByNameIgnoreCase(normalized).orElse(null);
                }

                // 3) Create new speciality (transient)
                if (speciality == null) {
                    Speciality newS = sDto.toEntity();
                    newS.setName(normalizeName(newS.getName()));
                    speciality = newS;
                }

                specialities.add(speciality);
            }

            artist.setSpecialities(specialities);
        }

        Artist saved = artistRepository.save(artist);

        PendingArtist pendingArtist = new PendingArtist(saved.getId());
        pendingArtistRepository.save(pendingArtist);

        return ArtistDTO.formEntity(saved);
    }


    @Transactional
    public Optional<ArtistDTO> update(Integer id, ArtistDTO dto, User currentUser) {
        Optional<Artist> opt = artistRepository.findById(id);
        if (opt.isEmpty()) return Optional.empty();

        Artist artist = opt.get();

        if (artist.getUser() == null || !artist.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You can only update your own artist profile");
        }

        artist.setName(dto.getName());
        artist.setLocation(dto.getLocation());
        artist.setDescription(dto.getDescription());
        artist.setPhone(dto.getPhone());
        artist.setSocialMedia(dto.getSocialMedia());

        // ---- HANDLE SPECIALITIES ----
        if (dto.getSpecialities() != null) {
            Set<Speciality> specialities = new HashSet<>();

            for (SpecialityDTO sDto : dto.getSpecialities()) {

                // ignore empty speciality rows
                if ((sDto.getId() == null || sDto.getId() <= 0)
                        && (sDto.getName() == null || sDto.getName().isBlank())) {
                    continue;
                }

                Speciality speciality = null;

                // 1) Try by ID
                if (sDto.getId() != null && sDto.getId() > 0) {
                    speciality = specialityRepository.findById(sDto.getId()).orElse(null);
                }

                // 2) Try by name
                if (speciality == null && sDto.getName() != null && !sDto.getName().isBlank()) {
                    String normalized = normalizeName(sDto.getName());
                    speciality = specialityRepository.findByNameIgnoreCase(normalized).orElse(null);
                }

                // 3) Create new speciality (transient)
                if (speciality == null) {
                    Speciality newS = sDto.toEntity();
                    newS.setName(normalizeName(newS.getName()));
                    speciality = newS;
                }

                specialities.add(speciality);
            }

            artist.setSpecialities(specialities);
        }

        Artist saved = artistRepository.save(artist);
        return Optional.of(ArtistDTO.formEntity(saved));
    }



    @Transactional
    public boolean delete(Integer id, User currentUser){
        Optional<Artist> opt = artistRepository.findById(id);

        if (opt.isEmpty()) {
            return false;
        }

        Artist artist = opt.get();

        if (artist.getUser() == null || !artist.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You can only delete your own artist profile");
        }

        // Clear the specialities relationship before deleting
        artist.setSpecialities(new HashSet<>());
        artistRepository.flush();  // Flush to clear the relationship

        // Delete PendingArtist
        pendingArtistRepository.deleteByArtistId(id);

        // Then delete the Artist
        artistRepository.delete(artist);

        return true;
    }

    @Transactional
    public boolean processApproval(Integer id, boolean isApproved) {
        return artistRepository.findById(id)
                .map(artist -> {
                    if (isApproved) {
                        artist.setApproved(true);
                        artistRepository.save(artist);
                    }

                    pendingArtistRepository.deleteByArtistId(id);

                    return isApproved;
                }).orElseThrow();
    }

    @Transactional
    public ArtistPhotoResponse uploadArtistPhoto(Integer artistId, MultipartFile file, User currentUser) {
        // validate file
        if (file == null || file.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Photo file is required");

        // validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");

        // validate file size (max 5MB)
        long maxSize = 5 * 1024 * 1024;
        if (file.getSize() > maxSize) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File size exceeds maximum limit of 5MB");

        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found"));

        // user owns this artist profile
        if (artist.getUser().getId() != currentUser.getId()) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update your own artist profile");

        try {
            // delete old photo if exists
            if (artist.getPhotoUrl() != null && !artist.getPhotoUrl().isBlank()) {
                try {
                    cloudflareService.deleteByUrl(artist.getPhotoUrl());
                } catch (IOException e) {
                    // Log warning but don't fail the upload
                    System.out.println("Warning: Could not delete old photo: " + e.getMessage());
                }
            }

            String newPhotoUrl = cloudflareService.uploadArtisProfileImage(file);

            artist.setPhotoUrl(newPhotoUrl);
            Artist saved = artistRepository.save(artist);

            ArtistDTO updatedArtistDTO = ArtistDTO.formEntity(saved);

            return new ArtistPhotoResponse(newPhotoUrl, updatedArtistDTO);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus. INTERNAL_SERVER_ERROR,
                    "Error uploading photo: " + e. getMessage(), e);
        }

    }

    private String normalizeName(String name) {
        if (name == null || name.isBlank()) return name;
        name = name.trim();
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }


}
