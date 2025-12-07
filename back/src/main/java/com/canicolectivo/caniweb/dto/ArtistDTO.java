package com.canicolectivo.caniweb.dto;

import com.canicolectivo.caniweb.Enum.Location;
import com.canicolectivo.caniweb.model.Artist;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class ArtistDTO {
    private Integer id;
    private String name;
    private Location location;
    private String description;
    private boolean approved;
    private String phone;
    private String photoUrl;
    private Map<String, String> socialMedia;
    private Integer userId;
    private Set<SpecialityDTO> specialities;

    public ArtistDTO(
            Integer id,
            String name,
            Location location,
            String description,
            boolean approved,
            String phone,
            String photoUrl,
            Map<String, String> socialMedia,
            Integer userId,
            Set<SpecialityDTO> specialities
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.approved = approved;
        this.phone = phone;
        this.photoUrl = photoUrl;
        this.socialMedia = socialMedia;
        this.userId = userId;
        this.specialities = specialities;
    }

    public static ArtistDTO fromEntity(Artist artist) {
        Set<SpecialityDTO> specialityDTOs = artist.getSpecialities() == null ? null :
                artist.getSpecialities().stream()
                        .map(SpecialityDTO::formEntity)
                        .collect(Collectors.toSet());

        return new ArtistDTO(
                artist.getId(),
                artist.getName(),
                artist.getLocation(),
                artist.getDescription(),
                artist.isApproved(),
                artist.getPhone(),
                artist.getPhotoUrl(),
                artist.getSocialMedia(),
                artist.getUser() != null ? artist.getUser().getId() : null,
                specialityDTOs
        );
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Map<String, String> getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(Map<String, String> socialMedia) {
        this.socialMedia = socialMedia;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getUserId() {
        return userId;
    }

    public Set<SpecialityDTO> getSpecialities() {
        return specialities;
    }

    public void setSpecialities(Set<SpecialityDTO> specialities) {
        this.specialities = specialities;
    }
}
