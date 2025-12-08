import styles from "../../ArtistRegisterPageClient.module.css";
export default function ArtistBasicInfoSection({
                                                   name,
                                                   onNameChange,
                                                   location,
                                                   onLocationChange,
                                                   locations,
                                                   description,
                                                   onDescriptionChange,
                                               }) {
    return (
        <>
            {/* Nombre */}
            <div>
                <label htmlFor="name" className={styles.label}>
                    Nombre artístico <span className={styles.required}>*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Ej. Cani Colectivo"
                    required
                />

            </div>

            {/* Ubicación */}
            <div className={styles.row}>
                <div>
                    <label htmlFor="location" className={styles.label}>
                        Ubicación <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="location"
                        className={styles.input}
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una ubicación</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc.replace("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Descripción */}
            <div>
                <label htmlFor="description" className={styles.label}>
                    Descripción / Bio
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className={styles.textarea}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Cuéntanos sobre tu proyecto, estilo, trayectoria..."
                />
            </div>
        </>
    );
}
