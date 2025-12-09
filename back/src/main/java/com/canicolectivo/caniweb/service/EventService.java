package com. canicolectivo.caniweb. service;

import com.canicolectivo.caniweb.Enum.Location;
import com. canicolectivo.caniweb. Enum.StatusEvent;
import com. canicolectivo.caniweb. dto.event.EventCreateDTO;
import com.canicolectivo.caniweb.dto.event. EventDTO;
import com.canicolectivo.caniweb.model.Event;
import com.canicolectivo.caniweb.repository.EventRepository;
import com.canicolectivo.caniweb.service.multimedia.CloudflareService;
import jakarta.transaction.Transactional;
import org. slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework. scheduling.annotation.Scheduled;
import org. springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework. web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private static final Logger log = LoggerFactory. getLogger(EventService.class);

    private final EventRepository eventRepository;
    private final CloudflareService cloudflareService;

    public EventService(EventRepository eventRepository, CloudflareService cloudflareService) {
        this. eventRepository = eventRepository;
        this.cloudflareService = cloudflareService;
    }

    public List<EventDTO> findAll() {
        return eventRepository.findAllOrderByDateDesc().stream()
                .map(EventDTO:: fromEntity)
                .toList();
    }

    public Optional<EventDTO> findById(Integer id) {
        return eventRepository.findById(id)
                .map(EventDTO:: fromEntity);
    }

    @Transactional
    public EventDTO create(EventCreateDTO createDTO) {
        validateEventTimes(createDTO. getStartHour(), createDTO.getEndHour());
        validateEventDate(createDTO.getDate());

        Event event = new Event();
        event.setName(createDTO.getName());
        event.setDescription(createDTO.getDescription());
        event.setLocation(createDTO.getLocation());
        event.setAddress(createDTO. getAddress());
        event.setVenue(createDTO.getVenue());
        event.setDate(createDTO.getDate());
        event.setStartHour(createDTO.getStartHour());
        event.setEndHour(createDTO. getEndHour());

        // Set initial status based on date
        event.setStatus(determineInitialStatus(createDTO.getDate()));

        Event savedEvent = eventRepository. save(event);
        log.info("Created new event: {} on {}", savedEvent.getName(), savedEvent.getDate());

        return EventDTO.fromEntity(savedEvent);
    }

    @Transactional
    public Optional<EventDTO> update(Integer id, EventDTO eventDTO) {
        return eventRepository.findById(id)
                .map(event -> {
                    validateEventTimes(eventDTO.getStartHour(), eventDTO.getEndHour());
                    validateEventDate(eventDTO. getDate());

                    event.setName(eventDTO.getName());
                    event.setDescription(eventDTO. getDescription());
                    event.setLocation(eventDTO.getLocation());
                    event.setAddress(eventDTO.getAddress());
                    event.setVenue(eventDTO.getVenue());
                    event.setDate(eventDTO.getDate());
                    event.setStartHour(eventDTO.getStartHour());
                    event.setEndHour(eventDTO.getEndHour());

                    // Update status if needed based on new date
                    if (shouldUpdateStatus(event.getStatus(), eventDTO.getDate())) {
                        event.setStatus(determineInitialStatus(eventDTO.getDate()));
                    } else if (eventDTO.getStatus() != null) {
                        event.setStatus(eventDTO.getStatus());
                    }

                    Event savedEvent = eventRepository. save(event);
                    log.info("Updated event: {} with ID:  {}", savedEvent.getName(), id);

                    return EventDTO.fromEntity(savedEvent);
                });
    }

    @Transactional
    public boolean delete(Integer id) {
        return eventRepository.findById(id)
                .map(event -> {
                    eventRepository.delete(event);
                    log.info("Deleted event: {} with ID: {}", event.getName(), id);
                    return true;
                })
                .orElse(false);
    }

    public List<EventDTO> findUpcomingEvents() {
        return eventRepository.findUpcomingEvents(LocalDate.now()).stream()
                .map(EventDTO:: fromEntity)
                .toList();
    }

    public List<EventDTO> findPastEvents() {
        return eventRepository. findPastEvents(LocalDate.now()).stream()
                .map(EventDTO:: fromEntity)
                .toList();
    }

    public List<EventDTO> findEventsByStatus(StatusEvent status) {
        return eventRepository.findByStatus(status).stream()
                .map(EventDTO:: fromEntity)
                .toList();
    }

    public List<EventDTO> findEventsByLocation(Location location) {
        return eventRepository.findByLocation(location).stream()
                .map(EventDTO::fromEntity)
                .toList();
    }

    public List<EventDTO> findEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate.isAfter(endDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before or equal to end date");
        }

        return eventRepository. findEventsByDateRange(startDate, endDate).stream()
                .map(EventDTO::fromEntity)
                .toList();
    }

    @Transactional
    @Scheduled(cron = "0 0 1 * * ? ") // Run daily at 1 AM
    public void updatePastEventsStatus() {
        LocalDate currentDate = LocalDate.now();

        int updatedCount = eventRepository.updatePastEventsStatus(
                currentDate,
                StatusEvent. PROXIMAMENTE,
                StatusEvent. FINALIZADO
        );

        if (updatedCount > 0) {
            log.info("Updated {} past events from PROXIMAMENTE to FINALIZADO", updatedCount);
        }

        int ongoingUpdated = eventRepository.updatePastEventsStatus(
                currentDate,
                StatusEvent. EN_CURSO,
                StatusEvent. FINALIZADO
        );

        if (ongoingUpdated > 0) {
            log. info("Updated {} ongoing past events to FINALIZADO", ongoingUpdated);
        }
    }

    @Transactional
    public Optional<EventDTO> updateEventStatus(Integer id, StatusEvent newStatus) {
        return eventRepository.findById(id)
                .map(event -> {
                    validateStatusTransition(event. getStatus(), newStatus);
                    event.setStatus(newStatus);
                    Event savedEvent = eventRepository.save(event);
                    log.info("Updated status of event {} to {}", event.getName(), newStatus);
                    return EventDTO. fromEntity(savedEvent);
                });
    }

    @Transactional
    public String uploadEventPhoto(Integer eventId, MultipartFile file) {
        if (file == null || file.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Photo file is required");

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");

        long maxSize = 5 * 1024 * 1024;
        if (file.getSize() > maxSize) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File size exceeds maximum limit of 5MB");

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        try {
            if (event.getPhotoUrl() != null && event.getPhotoUrl().isBlank()) {
                try {
                    cloudflareService.deleteByUrl(event.getPhotoUrl());
                } catch (IOException e) {
                    // Log warning but don't fail the upload
                    System.out.println("Warning: Could not delete old photo: " + e.getMessage());
                }
            }

            String newPhotoUrl = cloudflareService.uploadEventImage(file);

            event.setPhotoUrl(newPhotoUrl);

            eventRepository.save(event);

            return newPhotoUrl;

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus. INTERNAL_SERVER_ERROR,
                    "Error uploading photo: " + e. getMessage(), e);
        }
    }

    private void validateEventTimes(java.time.LocalTime startHour, java.time.LocalTime endHour) {
        if (startHour != null && endHour != null && ! endHour.isAfter(startHour)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End hour must be after start hour");
        }
    }

    private void validateEventDate(LocalDate eventDate) {
        if (eventDate != null && eventDate.isBefore(LocalDate.now())) {
            log.warn("Creating event with past date: {}", eventDate);
        }
    }

    private StatusEvent determineInitialStatus(LocalDate eventDate) {
        if (eventDate. isBefore(LocalDate.now())) {
            return StatusEvent.FINALIZADO;
        } else {
            return StatusEvent.PROXIMAMENTE;
        }
    }

    private boolean shouldUpdateStatus(StatusEvent currentStatus, LocalDate newDate) {
        // Only auto-update if status is PROXIMAMENTE or EN_CURSO and date changes
        return (currentStatus == StatusEvent.PROXIMAMENTE || currentStatus == StatusEvent. EN_CURSO);
    }

    private void validateStatusTransition(StatusEvent currentStatus, StatusEvent newStatus) {
        // Define valid status transitions
        if (currentStatus == StatusEvent.FINALIZADO && newStatus == StatusEvent.PROXIMAMENTE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot change status from FINALIZADO to PROXIMAMENTE");
        }

        if (currentStatus == StatusEvent.CANCELADO && newStatus == StatusEvent.EN_CURSO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot change status from CANCELADO to EN_CURSO");
        }
    }
}