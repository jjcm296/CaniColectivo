package com.canicolectivo.caniweb.dto.event;

import com.canicolectivo. caniweb. Enum.Location;
import com. canicolectivo.caniweb. Enum.StatusEvent;
import com. canicolectivo. caniweb.model.Event;
import com.fasterxml.jackson.annotation. JsonFormat;
import jakarta.validation.constraints. NotBlank;
import jakarta.validation. constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time. LocalDate;
import java.time.LocalTime;

public class EventDTO {
    private Integer id;

    @NotBlank(message = "Event name is required")
    @Size(max = 150, message = "Event name cannot exceed 150 characters")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Location is required")
    private Location location;

    @Size(max = 200, message = "Address cannot exceed 200 characters")
    private String address;

    @Size(max = 150, message = "Venue cannot exceed 150 characters")
    private String venue;

    @NotNull(message = "Event date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotNull(message = "Start hour is required")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startHour;

    @NotNull(message = "End hour is required")
    @JsonFormat(pattern = "HH: mm")
    private LocalTime endHour;

    private StatusEvent status;

    private String photoUrl;

    public EventDTO() {}

    public EventDTO(String name, String description, Location location, String address,
                    String venue, LocalDate date, LocalTime startHour, LocalTime endHour,
                    StatusEvent status, String photoUrl) {
        this.name = name;
        this.description = description;
        this.location = location;
        this. address = address;
        this.venue = venue;
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.status = status;
        this.photoUrl = photoUrl;
    }

    public static EventDTO fromEntity(Event event) {
        if (event == null) return null;

        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setName(event.getName());
        dto.setDescription(event. getDescription());
        dto.setLocation(event.getLocation());
        dto.setAddress(event.getAddress());
        dto.setVenue(event.getVenue());
        dto.setDate(event. getDate());
        dto.setStartHour(event.getStartHour());
        dto.setEndHour(event. getEndHour());
        dto.setStatus(event.getStatus());
        dto.setPhotoUrl(event.getPhotoUrl());
        return dto;
    }

    public Event toEntity() {
        Event event = new Event();
        event.setName(this.name);
        event.setDescription(this.description);
        event.setLocation(this.location);
        event.setAddress(this.address);
        event.setVenue(this.venue);
        event.setDate(this.date);
        event.setStartHour(this. startHour);
        event.setEndHour(this. endHour);
        event.setStatus(this.status != null ? this.status : StatusEvent.PROXIMAMENTE);
        event.setPhotoUrl(this.photoUrl);
        return event;
    }

    // Getters and Setters
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
        this. name = name;
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

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}