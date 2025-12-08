"use client";

import { useState, useCallback, useEffect } from "react";
import { getApprovedArtists } from "@/features/artists/api/artistApi";

export function useApprovedArtists(autoLoad = true) {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadArtists = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const result = await getApprovedArtists();

        if (!result.ok) {
            setError(result.error);
            setArtists([]);
        } else {
            setArtists(result.data || []);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (autoLoad) {
            loadArtists();
        }
    }, [autoLoad, loadArtists]);

    return {
        artists,
        isLoading,
        error,
        reload: loadArtists,
    };
}
