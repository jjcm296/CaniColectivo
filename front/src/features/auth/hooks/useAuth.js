"use client";

import { useCallback, useEffect, useState } from "react";
import { registerUser, loginUser } from "@/features/auth/api/authApi";

const TOKEN_KEY = "authToken";
const TOKEN_EXP_KEY = "authTokenExpiration";

export function useAuth() {
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedExp = localStorage.getItem(TOKEN_EXP_KEY);

        if (storedToken && storedExp) {
            const exp = Number(storedExp);
            if (!isNaN(exp) && Date.now() < exp) {
                setToken(storedToken);
                setTokenExpiration(exp);
                setIsAuth(true);
            } else {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(TOKEN_EXP_KEY);
            }
        }
    }, []);

    const handleAuthSuccess = useCallback((jwtToken, expirationTime) => {
        setToken(jwtToken);
        setTokenExpiration(expirationTime);
        setIsAuth(true);

        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, jwtToken);
            localStorage.setItem(TOKEN_EXP_KEY, String(expirationTime));
        }
    }, []);

    const register = useCallback(async (data) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const res = await registerUser(data);
            return { ok: true, data: res };
        } catch (err) {
            setAuthError(err?.message || "Error al registrar usuario");
            return { ok: false, error: err?.message || "Error al registrar usuario" };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(
        async (credentials) => {
            setIsLoading(true);
            setAuthError(null);
            try {
                const res = await loginUser(credentials);
                // res: { token, expiresIn }

                if (!res || !res.token) {
                    throw new Error("TOKEN_NOT_PROVIDED");
                }
                if (typeof res.expiresIn !== "number") {
                    throw new Error("EXPIRATION_NOT_PROVIDED");
                }

                const expiresInMs = res.expiresIn * 1000;
                const expirationTime = Date.now() + expiresInMs;

                handleAuthSuccess(res.token, expirationTime);
                return { ok: true, data: res };
            } catch (err) {
                console.log("LOGIN ERROR:", err);
                setAuthError(err?.message || "Error al iniciar sesión");
                return { ok: false, error: err?.message || "Error al iniciar sesión" };
            } finally {
                setIsLoading(false);
            }
        },
        [handleAuthSuccess]
    );

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpiration(null);
        setIsAuth(false);
        setAuthError(null);

        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(TOKEN_EXP_KEY);
        }
    }, []);

    return {
        token,
        tokenExpiration,
        isAuth,
        isLoading,
        authError,
        register,
        login,
        logout,
    };
}
