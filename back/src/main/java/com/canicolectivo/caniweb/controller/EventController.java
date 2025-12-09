package com.canicolectivo.caniweb.controller;

import com.canicolectivo. caniweb. Enum.Location;
import com.canicolectivo.caniweb. Enum.StatusEvent;
import com.canicolectivo. caniweb.dto.event.EventCreateDTO;
import com.canicolectivo.caniweb.dto.event. EventDTO;
import com.canicolectivo.caniweb.service.EventService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org. springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/events")
@RestController
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Integer id) {
        return eventService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventCreateDTO createDTO) {
        EventDTO createdEvent = eventService.create(createDTO);
        return ResponseEntity.status(201).body(createdEvent);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Integer id,
                                                @Valid @RequestBody EventDTO eventDTO) {
        return eventService.update(id, eventDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity. notFound().build());
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        boolean deleted = eventService. delete(id);
        return deleted ? ResponseEntity. noContent().build() : ResponseEntity.notFound().build();
    }


    @PostMapping("/{id}/photo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadPhoto(@PathVariable Integer id,
                                              @RequestParam("photo") MultipartFile file) {

        String photoUrl = eventService.uploadEventPhoto(id, file);

        return ResponseEntity.ok(photoUrl);
    }
}