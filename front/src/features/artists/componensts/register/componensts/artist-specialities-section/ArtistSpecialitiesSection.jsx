// ruta: .../artist-specialities-section/ArtistSpecialitiesSection.jsx
import styles from "../../ArtistRegisterPageClient.module.css";
// ajusta la ruta al module.css real si es distinta

export default function ArtistSpecialitiesSection({
                                                      typeValue,
                                                      onChangeType,
                                                      specialityName,
                                                      onChangeSpecialityName,
                                                      options,
                                                      loading,
                                                      error,
                                                  }) {
    const hasOptions = Array.isArray(options) && options.length > 0;

    const prettyType = (type) =>
        type
            ? type
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase())
            : "";

    return (
        <div>
            <label htmlFor="specialityType" className={styles.label}>
                Tipo de especialidad
            </label>

            <select
                id="specialityType"
                className={styles.input}
                value={typeValue}
                onChange={(e) => onChangeType(e.target.value)}
                disabled={loading || !hasOptions}
            >
                <option value="">
                    {loading
                        ? "Cargando tipos de especialidades..."
                        : !hasOptions
                            ? "No hay tipos de especialidades disponibles"
                            : "Selecciona un tipo de especialidad"}
                </option>

                {hasOptions &&
                    options.map((type) => (
                        <option key={type} value={type}>
                            {prettyType(type)}
                        </option>
                    ))}
            </select>

            {/* Input solo si ya eligió un tipo */}
            {typeValue && (
                <div style={{ marginTop: 8 }}>
                    <label htmlFor="specialityName" className={styles.label}>
                        ¿Qué haces dentro de {prettyType(typeValue)}?
                    </label>
                    <input
                        id="specialityName"
                        type="text"
                        className={styles.input}
                        value={specialityName}
                        onChange={(e) => onChangeSpecialityName(e.target.value)}
                        placeholder="Ej. Pintor en acuarelas, banda de rock, actriz..."
                    />
                    <p className={styles.helperText}>
                        Así podremos mostrar tu especialidad de forma más precisa.
                    </p>
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
