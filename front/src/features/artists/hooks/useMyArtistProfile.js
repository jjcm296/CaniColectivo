// src/features/artists/hooks/useMyArtistProfile.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getMyArtistProfile } from "@/features/artists/api/artistApi";

export function useMyArtistProfile() {
    const { token } = useAuth();
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            // si no hay token, consideramos que no hay perfil
            if (!token) {
                setIsLoading(false);
                setArtist(null);
                return;
            }

            setIsLoading(true);
            const res = await getMyArtistProfile(token);

            if (cancelled) return;

            if (!res.ok) {
                setError(res.error);
                setArtist(null);
            } else {
                setError(null);
                setArtist(res.data);
            }

            setIsLoading(false);
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [token]);

    return { artist, isLoading, error };
}
