"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getCurrentUser } from "@/features/artists/api/artistAdminApi";

export function useCurrentUser() {
    const { isAuth, token } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            if (!isAuth || !token) {
                setUser(null);
                setUserError(null);
                return;
            }

            setIsLoadingUser(true);
            setUserError(null);
            const res = await getCurrentUser(token);

            if (!cancelled) {
                if (res.ok) {
                    setUser(res.data);
                } else {
                    setUser(null);
                    setUserError(res.error || "No se pudo obtener el usuario.");
                }
                setIsLoadingUser(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [isAuth, token]);

    return { user, isLoadingUser, userError, isAuth, token };
}
