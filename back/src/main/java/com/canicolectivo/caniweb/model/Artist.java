package com.canicolectivo.caniweb.model;

import com.canicolectivo.caniweb.Enum.Location;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.Type;


import java.util.*;

@Entity
@Table(name = "artists")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "name", length = 70, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "location", length = 15, nullable = false)
    private Location location;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "approved", nullable = false)
    private boolean approved = false;

    @Size(max = 20)
    @Column(name = "phone", length = 20)
    private String phone;

    @Size(max = 1000)
    @Column(name = "photo_url", length = 1000)
    private String photoUrl;

    @Type(JsonType.class)
    @Column(name = "social_media", columnDefinition = "jsonb")
    private Map<String, String> socialMedia = new HashMap<>();

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "artist_speciality",
            joinColumns = @JoinColumn(name = "artist_id"),
            inverseJoinColumns = @JoinColumn(name = "speciality_id")
    )
    private Set<Speciality> specialities = new HashSet<>();


    public Artist() {}

    public Artist(String name,
                  Location location, String description,
                  String phone, String photoUrl,
                  Map<String, String> socialMedia, User user,
                  Set<Speciality> specialities) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.phone = phone;
        this.photoUrl = photoUrl;
        this.socialMedia = socialMedia != null ? new HashMap<>(socialMedia) : new HashMap<>();
        this.user = user;
        if (specialities != null) {
            specialities.forEach(this::addSpeciality);
        }
    }

    public int getId() {
        return id;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
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

    public @Size(max = 20) String getPhone() {
        return phone;
    }

    public void setPhone(@Size(max = 20) String phone) {
        this.phone = phone;
    }

    public @Size(max = 1000) String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(@Size(max = 1000) String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Map<String, String> getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(Map<String, String> socialMedia) {
        this.socialMedia = socialMedia != null ? new HashMap<>(socialMedia) : new HashMap<>();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Speciality> getSpecialities() {
        return Collections.unmodifiableSet(specialities);
    }

    public void addSpeciality(Speciality speciality) {
        if (speciality == null) return;
        if (specialities.add(speciality)) {
            speciality.getArtistsInternal().add(this);
        }
    }

    public void removeSpeciality(Speciality speciality) {
        if (speciality == null) return;
        if (specialities.remove(speciality)) {
            speciality.getArtistsInternal().remove(this);
        }
    }

    public void setSpecialities(Set<Speciality> newSpecialities) {
        // remove old links
        for (Speciality s : new HashSet<>(this.specialities)) {
            removeSpeciality(s);
        }
        // add new ones
        if (newSpecialities != null) {
            newSpecialities.forEach(this::addSpeciality);
        }
    }
}
