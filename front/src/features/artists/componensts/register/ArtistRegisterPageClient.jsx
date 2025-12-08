"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/features/ui/back-button/BackButton";
import styles from "./ArtistRegisterPageClient.module.css";

import ArtistPhotoSection
    from "@/features/artists/componensts/register/componensts/artist-photo-section/ArtistPhotoSection";
import ArtistSocialSection
    from "@/features/artists/componensts/register/componensts/artist-social-section/ArtistSocialSection";
import ArtistBasicInfoSection
    from "@/features/artists/componensts/register/componensts/artist-basicInfo-section/ArtistBasicInfoSection";
import ArtistSpecialitiesSection
    from "@/features/artists/componensts/register/componensts/artist-specialities-section/ArtistSpecialitiesSection";

import { useArtistProfile } from "@/features/artists/hooks/useArtistProfile";
import { useFeedback } from "@/features/ui/feedback-context/FeedbackContext";

const SOCIAL_TYPES = [
    { id: "whatsapp", label: "Teléfono / WhatsApp", placeholder: "+52 ..." },
    { id: "instagram", label: "Instagram", placeholder: "@usuario o enlace" },
    { id: "facebook", label: "Facebook", placeholder: "Página o perfil" },
    { id: "tiktok", label: "TikTok", placeholder: "@usuario o enlace" },
    { id: "x", label: "X (Twitter)", placeholder: "@usuario o enlace" },
    { id: "email", label: "Correo de contacto", placeholder: "correo@ejemplo.com" },
];

const LOCATIONS = [
    "MINATITLAN",
    "COATZACOALCOS",
    "ACAYUCAN",
    "COSOLEACAQUE",
    "NANCHITAL",
    "LAS_CHOAPAS",
    "JALTIPAN",
    "OTEAPAN",
    "IXHUATLAN",
    "CHINAMECA",
];

const ARTIST_MESSAGES = {
    loading: "Guardando tu perfil de artista...",
    success: "Perfil concluido. ¡Bienvenidx a CANI!",
    defaultError: "No pudimos guardar tu perfil. Intenta de nuevo.",
};

export default function ArtistRegisterPageClient({ emailParam }) {
    const router = useRouter();
    const { showLoading, showSuccess, showError, hide } = useFeedback();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    // foto de perfil
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    // redes
    const [socialValues, setSocialValues] = useState({
        instagram: "",
        facebook: "",
        tiktok: "",
        x: "",
        email: "",
        whatsapp: "",
    });
    const [activeSocial, setActiveSocial] = useState("instagram");

    // especialidades: tipo + nombre concreto
    const [selectedSpecialityType, setSelectedSpecialityType] = useState("");
    const [specialityName, setSpecialityName] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // hook de perfil (API)
    const {
        createProfile,
        isSaving,
        specialityTypes,
        isLoadingSpecialities,
        specialitiesError,
        loadSpecialityTypes,
    } = useArtistProfile();

    useEffect(() => {
        loadSpecialityTypes();
    }, [loadSpecialityTypes]);

    const handleSocialChange = (id, value) => {
        setSocialValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview);
        }

        setPhotoFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPhotoPreview(objectUrl);
    };

    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        // obligatorios
        if (!name.trim()) {
            setError("El nombre del artista es obligatorio.");
            return;
        }

        if (!location.trim()) {
            setError("La ubicación es obligatoria.");
            return;
        }

        // especialidad opcional
        const specialities =
            selectedSpecialityType && specialityName.trim()
                ? [
                    {
                        type: selectedSpecialityType,
                        name: specialityName.trim(),
                    },
                ]
                : [];
        const phone = socialValues.whatsapp
            ? `${socialValues.whatsapp.code}${socialValues.whatsapp.number}`.trim()
            : null;
        const socialMedia = {
            instagram: socialValues.instagram.trim() || null,
            facebook: socialValues.facebook.trim() || null,
            tiktok: socialValues.tiktok.trim() || null,
            x: socialValues.x.trim() || null,
            email: socialValues.email.trim() || null,
            whatsapp: phone,
        };

        const payload = {
            name: name.trim(),
            location: location.trim(),
            description: description.trim() || null,
            phone,
            socialMedia,
            specialities,
        };

        try {
            showLoading(ARTIST_MESSAGES.loading);

            const result = await createProfile(payload);
            hide();

            if (!result?.ok) {
                const msg = result?.error || ARTIST_MESSAGES.defaultError;
                setError(msg);
                showError(msg);
                return;
            }

            setSuccess(ARTIST_MESSAGES.success);
            showSuccess(ARTIST_MESSAGES.success);

            // pequeño delay para que se vea el modal global
            setTimeout(() => {
                router.push("/");
            }, 800);
        } catch (err) {
            hide();
            console.error("Error al crear perfil de artista:", err);
            const msg = ARTIST_MESSAGES.defaultError;
            setError(msg);
            showError(msg);
        }
    };

    return (
        <main className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.topBar}>
                    <BackButton label="Volver" />
                </div>

                <header className={styles.header}>
                    <p className={styles.kicker}>Paso 2 · Perfil de artista</p>
                    <h1 className={styles.title}>Crea tu perfil público</h1>
                    {emailParam && (
                        <p className={styles.subtitle}>
                            Estás registrando el perfil para: <span>{emailParam}</span>
                        </p>
                    )}
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* 1. Foto de perfil */}
                    <ArtistPhotoSection
                        name={name}
                        photoPreview={photoPreview}
                        onPhotoChange={handlePhotoChange}
                    />

                    {/* 2. Datos básicos */}
                    <ArtistBasicInfoSection
                        name={name}
                        onNameChange={setName}
                        location={location}
                        onLocationChange={setLocation}
                        locations={LOCATIONS}
                        description={description}
                        onDescriptionChange={setDescription}
                    />

                    {/* 3. Redes sociales */}
                    <ArtistSocialSection
                        socialTypes={SOCIAL_TYPES}
                        socialValues={socialValues}
                        activeSocial={activeSocial}
                        onChangeActiveSocial={setActiveSocial}
                        onChangeSocialValue={handleSocialChange}
                    />

                    {/* 4. Especialidades */}
                    <ArtistSpecialitiesSection
                        typeValue={selectedSpecialityType}
                        onChangeType={setSelectedSpecialityType}
                        specialityName={specialityName}
                        onChangeSpecialityName={setSpecialityName}
                        options={specialityTypes}
                        loading={isLoadingSpecialities}
                        error={specialitiesError}
                    />

                    {/* Mensajes inline */}
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSaving}
                    >
                        {isSaving ? "Guardando perfil..." : "Guardar perfil de artista"}
                    </button>
                </form>
            </section>
        </main>
    );
}
