"use client";

import React, { createContext, useContext, useState } from "react";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
    const [state, setState] = useState({
        open: false,
        type: null,        // "loading" | "success" | "error"
        title: "",
        message: "",
    });

    const showLoading = (message) => {
        setState({
            open: true,
            type: "loading",
            title: "Procesando...",
            message: message || "Por favor espera un momento.",
        });
    };

    const showSuccess = (message) => {
        setState({
            open: true,
            type: "success",
            title: "Operación exitosa",
            message: message || "La acción se completó correctamente.",
        });
    };

    const showError = (message) => {
        setState({
            open: true,
            type: "error",
            title: "Ocurrió un error",
            message: message || "No se pudo completar la acción.",
        });
    };

    const hide = () => {
        setState(function (prev) {
            return { ...prev, open: false, type: null };
        });
    };

    const value = {
        state,
        showLoading,
        showSuccess,
        showError,
        hide,
    };

    return (
        <>
            <FeedbackContext.Provider value={value}>
                {children}
            </FeedbackContext.Provider>

            {state.open && <FeedbackModal state={state} onClose={hide} />}
        </>
    );
}

export function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx) {
        throw new Error("useFeedback must be used within FeedbackProvider");
    }
    return ctx;
}

/* ===== Modal simple global ===== */
function FeedbackModal({ state, onClose }) {
    const { type, title, message } = state;

    const isLoading = type === "loading";
    const isSuccess = type === "success";
    const isError = type === "error";

    return (
        <div className="feedback-backdrop">
            <div className="feedback-modal">

                {/* ÍCONO (spinner / success / error) */}
                <div className="feedback-icon">
                    {isLoading && (
                        <div className="feedback-spinner" />
                    )}

                    {isSuccess && (
                        <div className="feedback-icon-success">
                            ✓
                        </div>
                    )}

                    {isError && (
                        <div className="feedback-icon-error">
                            !
                        </div>
                    )}
                </div>

                {/* TÍTULO */}
                <h3 className="feedback-title">{title}</h3>

                {/* MENSAJE */}
                {message && <p className="feedback-text">{message}</p>}

                {/* BOTÓN (no aparece en loading) */}
                {!isLoading && (
                    <button
                        type="button"
                        className="feedback-btn"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                )}
            </div>
        </div>
    );
}
