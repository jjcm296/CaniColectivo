// src/features/artists/hooks/useArtistProfile.js
"use client";

import { useState, useCallback } from "react";
import {
    createArtistProfile,
    getSpecialityTypes,
    uploadArtistPhoto,
} from "../api/artistApi";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useArtistProfile() {
    const { token } = useAuth();

    const [isSaving, setIsSaving] = useState(false);

    // estados para especialidades
    const [specialityTypes, setSpecialityTypes] = useState([]);
    const [isLoadingSpecialities, setIsLoadingSpecialities] = useState(false);
    const [specialitiesError, setSpecialitiesError] = useState(null);

    // Crear perfil
    const createProfile = useCallback(
        async (payload) => {
            setIsSaving(true);
            try {
                const result = await createArtistProfile(payload, token);
                return result;
            } finally {
                setIsSaving(false);
            }
        },
        [token]
    );

    // Subir foto de perfil de artista
    const uploadProfilePhoto = useCallback(
        async (artistId, file) => {
            if (!artistId || !file) {
                return { ok: false, error: "Faltan datos para subir la foto." };
            }

            setIsSaving(true);
            try {
                const result = await uploadArtistPhoto(artistId, file, token);
                return result;
            } finally {
                setIsSaving(false);
            }
        },
        [token]
    );

    // Cargar tipos de especialidades desde la API
    const loadSpecialityTypes = useCallback(async () => {
        setIsLoadingSpecialities(true);
        setSpecialitiesError(null);

        const result = await getSpecialityTypes();

        if (!result.ok) {
            setSpecialitiesError(result.error);
            setSpecialityTypes([]);
        } else {
            setSpecialityTypes(result.data || []);
        }

        setIsLoadingSpecialities(false);
    }, []);

    return {
        createProfile,
        uploadProfilePhoto,
        isSaving,
        specialityTypes,
        isLoadingSpecialities,
        specialitiesError,
        loadSpecialityTypes,
    };
}
