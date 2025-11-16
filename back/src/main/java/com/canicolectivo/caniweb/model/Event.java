package com.canicolectivo.caniweb.model;

import com.canicolectivo.caniweb.Enum.Location;
import com.canicolectivo.caniweb.Enum.StatusEvent;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 15)
    private Location location;

    @Column(length = 200)
    private String address;

    @Column(length = 150)
    private String venue;

    private LocalDate date;

    private LocalTime startHour;

    // ADD VALIDATION: ENDHOUR MUST BE AFTER START HOUR
    private LocalTime endHour;

    // ADD VALIDATION: CHANGE STATUS AUTOMATICALLY WHEN THE DATE OF THE EVENT HAS PASSED
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 15, nullable = false)
    private StatusEvent status;

    public Event() {}

    public Event(String name, String description,
                 Location location, String address,
                 String venue, LocalDate date,
                 LocalTime startHour, LocalTime endHour,
                 StatusEvent status) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.address = address;
        this.venue = venue;
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.status = status;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartHour() {
        return startHour;
    }

    public void setStartHour(LocalTime startHour) {
        this.startHour = startHour;
    }

    public LocalTime getEndHour() {
        return endHour;
    }

    public void setEndHour(LocalTime endHour) {
        this.endHour = endHour;
    }

    public StatusEvent getStatus() {
        return status;
    }

    public void setStatus(StatusEvent status) {
        this.status = status;
    }
}
