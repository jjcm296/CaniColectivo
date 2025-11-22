import {
    dbGetAllEvents,
    dbGetEventById,
    dbGetEventByName,
} from "@/features/fakeDb/fakeDb";

export async function getEvents() {
    return dbGetAllEvents();
}

export async function getEventById(id) {
    return dbGetEventById(id);
}

export async function getEventByName(name) {
    return dbGetEventByName(name);
}
