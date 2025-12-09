"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    createArtistProfile,
    updateArtistProfile,
    uploadArtistPhoto,
    getSpecialityTypes,
} from "@/features/artists/api/artistApi";

export function useArtistProfile() {
    const { token } = useAuth();

    const [isSaving, setIsSaving] = useState(false);

    const [specialityTypes, setSpecialityTypes] = useState([]);
    const [isLoadingSpecialities, setIsLoadingSpecialities] = useState(false);
    const [specialitiesError, setSpecialitiesError] = useState(null);

    const loadSpecialityTypes = useCallback(async () => {
        setIsLoadingSpecialities(true);
        setSpecialitiesError(null);

        const res = await getSpecialityTypes();

        if (!res.ok) {
            setSpecialitiesError(res.error || "No se pudieron cargar las especialidades.");
            setSpecialityTypes([]);
        } else {
            setSpecialityTypes(res.data || []);
        }

        setIsLoadingSpecialities(false);
    }, []);

    const createProfile = useCallback(
        async (payload) => {
            setIsSaving(true);
            const result = await createArtistProfile(payload, token);
            setIsSaving(false);
            return result;
        },
        [token]
    );

    const updateProfile = useCallback(
        async (artistId, payload) => {
            setIsSaving(true);
            const result = await updateArtistProfile(artistId, payload, token);
            setIsSaving(false);
            return result;
        },
        [token]
    );

    const uploadProfilePhotoFn = useCallback(
        async (artistId, file) => {
            if (!file) return { ok: true };
            return uploadArtistPhoto(artistId, file, token);
        },
        [token]
    );

    return {
        createProfile,
        updateProfile,
        uploadProfilePhoto: uploadProfilePhotoFn,
        isSaving,
        specialityTypes,
        isLoadingSpecialities,
        specialitiesError,
        loadSpecialityTypes,
    };
}
