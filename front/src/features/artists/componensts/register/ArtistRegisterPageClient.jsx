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
import { useMyArtistProfile } from "@/features/artists/hooks/useMyArtistProfile";
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
    loadingCreate: "Guardando tu perfil de artista...",
    loadingUpdate: "Guardando cambios en tu perfil...",
    successCreate: "Perfil concluido. ¡Bienvenidx a CANI!",
    successUpdate: "Perfil actualizado correctamente.",
    defaultError: "No pudimos guardar tu perfil. Intenta de nuevo.",
};

export default function ArtistRegisterPageClient({ emailParam, mode = "create" }) {
    const router = useRouter();
    const { showLoading, showSuccess, showError, hide } = useFeedback();
    const isEdit = mode === "edit";

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    const [socialValues, setSocialValues] = useState({
        instagram: "",
        facebook: "",
        tiktok: "",
        x: "",
        email: "",
        whatsapp: "",
    });
    const [activeSocial, setActiveSocial] = useState("instagram");

    const [selectedSpecialityType, setSelectedSpecialityType] = useState("");
    const [specialityName, setSpecialityName] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {
        createProfile,
        updateProfile,
        uploadProfilePhoto,
        isSaving,
        specialityTypes,
        isLoadingSpecialities,
        specialitiesError,
        loadSpecialityTypes,
    } = useArtistProfile();

    const { artist: myArtist, isLoading: isLoadingMyArtist } = useMyArtistProfile();

    useEffect(() => {
        loadSpecialityTypes();
    }, [loadSpecialityTypes]);

    useEffect(() => {
        if (!isEdit || !myArtist) return;

        setName(myArtist.name || "");
        setLocation(myArtist.location || myArtist.city || "");
        setDescription(myArtist.description || myArtist.bio || "");

        const social = myArtist.social || myArtist.socialMedia || {};

        setSocialValues((prev) => ({
            ...prev,
            instagram: social.instagram || "",
            facebook: social.facebook || "",
            tiktok: social.tiktok || "",
            x: social.x || "",
            email: social.email || "",
            whatsapp: social.whatsapp || "",
        }));

        if (myArtist.photoUrl) {
            setPhotoPreview(myArtist.photoUrl);
        }

        if (Array.isArray(myArtist.specialities) && myArtist.specialities.length > 0) {
            const first = myArtist.specialities[0];
            setSelectedSpecialityType(first.type || "");
            setSpecialityName(first.name || "");
        }
    }, [isEdit, myArtist]);

    const handleSocialChange = (id, value) => {
        setSocialValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (photoPreview && !photoPreview.startsWith("http")) {
            URL.revokeObjectURL(photoPreview);
        }

        setPhotoFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPhotoPreview(objectUrl);
    };

    useEffect(() => {
        return () => {
            if (photoPreview && !photoPreview.startsWith("http")) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("El nombre del artista es obligatorio.");
            return;
        }

        if (!location.trim()) {
            setError("La ubicación es obligatoria.");
            return;
        }

        const specialities =
            selectedSpecialityType && specialityName.trim()
                ? [
                    {
                        type: selectedSpecialityType,
                        name: specialityName.trim(),
                    },
                ]
                : [];

        let phone = null;

        if (socialValues.whatsapp) {
            if (
                typeof socialValues.whatsapp === "object" &&
                (socialValues.whatsapp.code || socialValues.whatsapp.number)
            ) {
                phone = `${socialValues.whatsapp.code || ""}${
                    socialValues.whatsapp.number || ""
                }`.trim();
            } else if (typeof socialValues.whatsapp === "string") {
                phone = socialValues.whatsapp.trim();
            }
        }

        const socialMedia = {
            instagram: socialValues.instagram?.trim() || null,
            facebook: socialValues.facebook?.trim() || null,
            tiktok: socialValues.tiktok?.trim() || null,
            x: socialValues.x?.trim() || null,
            email: socialValues.email?.trim() || null,
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
            const loadingMsg = isEdit
                ? ARTIST_MESSAGES.loadingUpdate
                : ARTIST_MESSAGES.loadingCreate;
            const successMsg = isEdit
                ? ARTIST_MESSAGES.successUpdate
                : ARTIST_MESSAGES.successCreate;

            showLoading(loadingMsg);

            let result;
            let artistId;

            if (isEdit && myArtist?.id) {
                result = await updateProfile(myArtist.id, payload);
            } else {
                result = await createProfile(payload);
            }

            if (!result?.ok) {
                hide();
                const msg = result?.error || ARTIST_MESSAGES.defaultError;
                setError(msg);
                showError(msg);
                return;
            }

            const savedArtist = result.data || {};
            artistId = savedArtist.id || myArtist?.id;

            if (artistId && photoFile) {
                const photoResult = await uploadProfilePhoto(artistId, photoFile);
                if (!photoResult?.ok) {
                    console.error("No se pudo subir la foto del artista:", photoResult?.error);
                }
            }

            hide();
            setSuccess(successMsg);
            showSuccess(successMsg);

            setTimeout(() => {
                if (isEdit) {
                    router.push("/profile");
                } else {
                    router.push("/");
                }
            }, 800);
        } catch (err) {
            hide();
            console.error("Error al guardar perfil de artista:", err);
            const msg = ARTIST_MESSAGES.defaultError;
            setError(msg);
            showError(msg);
        }
    };

    const title = isEdit ? "Edita tu perfil público" : "Crea tu perfil público";
    const kicker = isEdit ? "Editar · Perfil de artista" : "Paso 2 · Perfil de artista";
    const submitLabel = isEdit
        ? isSaving
            ? "Guardando cambios..."
            : "Guardar cambios"
        : isSaving
            ? "Guardando perfil..."
            : "Guardar perfil de artista";

    return (
        <main className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.topBar}>
                    <BackButton label="Volver" />
                </div>

                <header className={styles.header}>
                    <p className={styles.kicker}>{kicker}</p>
                    <h1 className={styles.title}>{title}</h1>
                    {!isEdit && emailParam && (
                        <p className={styles.subtitle}>
                            Estás registrando el perfil para: <span>{emailParam}</span>
                        </p>
                    )}
                </header>

                {isEdit && isLoadingMyArtist && (
                    <p className={styles.loadingHint}>Cargando tu perfil...</p>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <ArtistPhotoSection
                        name={name}
                        photoPreview={photoPreview}
                        onPhotoChange={handlePhotoChange}
                    />

                    <ArtistBasicInfoSection
                        name={name}
                        onNameChange={setName}
                        location={location}
                        onLocationChange={setLocation}
                        locations={LOCATIONS}
                        description={description}
                        onDescriptionChange={setDescription}
                    />

                    <ArtistSocialSection
                        socialTypes={SOCIAL_TYPES}
                        socialValues={socialValues}
                        activeSocial={activeSocial}
                        onChangeActiveSocial={setActiveSocial}
                        onChangeSocialValue={handleSocialChange}
                    />

                    <ArtistSpecialitiesSection
                        typeValue={selectedSpecialityType}
                        onChangeType={setSelectedSpecialityType}
                        specialityName={specialityName}
                        onChangeSpecialityName={setSpecialityName}
                        options={specialityTypes}
                        loading={isLoadingSpecialities}
                        error={specialitiesError}
                    />

                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSaving}
                    >
                        {submitLabel}
                    </button>
                </form>
            </section>
        </main>
    );
}
