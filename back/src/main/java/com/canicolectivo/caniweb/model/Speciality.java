package com.canicolectivo.caniweb.model;

import com.canicolectivo.caniweb.Enum.TypeSpeciality;
import jakarta.persistence.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "specialities")
public class Speciality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 45)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 20, nullable = false)
    private TypeSpeciality type;

    @ManyToMany(mappedBy = "specialities", fetch = FetchType.LAZY)
    private Set<Artist> artists = new HashSet<>();

    public Speciality() {}

    public Speciality(String name, TypeSpeciality type) {
        this.name = name;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeSpeciality getType() {
        return type;
    }

    public void setType(TypeSpeciality type) {
        this.type = type;
    }

    public Set<Artist> getArtists() {
        return Collections.unmodifiableSet(artists);
    }

    Set<Artist> getArtistsInternal() {
        return artists;
    }

    public void addArtist(Artist artist) {
        if (artist == null) return;
        if (artists.add(artist)) {
            artist.addSpeciality(this); // will update artists collection via artist.addSpeciality logic
        }
    }

    public void removeArtist(Artist artist) {
        if (artist == null) return;
        if (artists.remove(artist)) {
            artist.removeSpeciality(this);
        }
    }

    public void setArtists(Set<Artist> newArtists) {
        for (Artist a : new HashSet<>(this.artists)) {
            removeArtist(a);
        }
        if (newArtists != null) {
            newArtists.forEach(this::addArtist);
        }
    }

}
