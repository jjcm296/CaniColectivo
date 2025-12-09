package com.canicolectivo.caniweb.repository;

import com.canicolectivo.caniweb.Enum.StatusEvent;
import com.canicolectivo.caniweb.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByStatus(StatusEvent status);

    @Query("SELECT e FROM Event e WHERE e. date >= :currentDate AND e.status = : status ORDER BY e.date ASC, e.startHour ASC")
    List<Event> findUpcomingEventsByStatus(@Param("currentDate") LocalDate currentDate, @Param("status") StatusEvent status);

    @Query("""
       SELECT e FROM Event e
       WHERE e.date >= :currentDate
         AND e.status IN (
             com.canicolectivo.caniweb.Enum.StatusEvent.PROXIMAMENTE,
             com.canicolectivo.caniweb.Enum.StatusEvent.EN_CURSO
         )
       ORDER BY e.date ASC, e.startHour ASC
       """)
    List<Event> findUpcomingEvents(@Param("currentDate") LocalDate currentDate);

    @Query("""
       SELECT e FROM Event e
       WHERE e.date < :currentDate
         AND e.status IN (
             com.canicolectivo.caniweb.Enum.StatusEvent.PROXIMAMENTE,
             com.canicolectivo.caniweb.Enum.StatusEvent.EN_CURSO
         )
       ORDER BY e.date DESC
       """)
    List<Event> findPastEventsToUpdate(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT e FROM Event e WHERE e.date < : currentDate ORDER BY e.date DESC")
    List<Event> findPastEvents(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT e FROM Event e WHERE e.date BETWEEN :startDate AND :endDate ORDER BY e.date ASC, e.startHour ASC")
    List<Event> findEventsByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Modifying
    @Query("UPDATE Event e SET e. status = :newStatus WHERE e.date < :currentDate AND e.status = :oldStatus")
    int updatePastEventsStatus(@Param("currentDate") LocalDate currentDate,
                               @Param("oldStatus") StatusEvent oldStatus,
                               @Param("newStatus") StatusEvent newStatus);

    List<Event> findByLocation(com.canicolectivo.caniweb.Enum.Location location);

    @Query("SELECT e FROM Event e ORDER BY e.date DESC, e.startHour DESC")
    List<Event> findAllOrderByDateDesc();

}
