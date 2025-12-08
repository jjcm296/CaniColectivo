import styles from "../../ArtistRegisterPageClient.module.css";
import SocialIcon from "@/features/ui/social-icon/SocialIcon";

const PHONE_CODES = [
    { code: "+93", label: "Afganistán (+93)" },
    { code: "+355", label: "Albania (+355)" },
    { code: "+49", label: "Alemania (+49)" },
    { code: "+213", label: "Argelia (+213)" },
    { code: "+54", label: "Argentina (+54)" },
    { code: "+374", label: "Armenia (+374)" },
    { code: "+61", label: "Australia (+61)" },
    { code: "+43", label: "Austria (+43)" },
    { code: "+973", label: "Baréin (+973)" },
    { code: "+880", label: "Bangladés (+880)" },
    { code: "+32", label: "Bélgica (+32)" },
    { code: "+229", label: "Benín (+229)" },
    { code: "+591", label: "Bolivia (+591)" },
    { code: "+387", label: "Bosnia y Herzegovina (+387)" },
    { code: "+55", label: "Brasil (+55)" },
    { code: "+673", label: "Brunéi (+673)" },
    { code: "+359", label: "Bulgaria (+359)" },
    { code: "+855", label: "Camboya (+855)" },
    { code: "+237", label: "Camerún (+237)" },
    { code: "+1", label: "Canadá (+1)" },
    { code: "+56", label: "Chile (+56)" },
    { code: "+86", label: "China (+86)" },
    { code: "+57", label: "Colombia (+57)" },
    { code: "+506", label: "Costa Rica (+506)" },
    { code: "+385", label: "Croacia (+385)" },
    { code: "+53", label: "Cuba (+53)" },
    { code: "+45", label: "Dinamarca (+45)" },
    { code: "+1809", label: "República Dominicana (+1809)" },
    { code: "+593", label: "Ecuador (+593)" },
    { code: "+20", label: "Egipto (+20)" },
    { code: "+503", label: "El Salvador (+503)" },
    { code: "+971", label: "Emiratos Árabes Unidos (+971)" },
    { code: "+34", label: "España (+34)" },
    { code: "+1", label: "Estados Unidos (+1)" },
    { code: "+372", label: "Estonia (+372)" },
    { code: "+251", label: "Etiopía (+251)" },
    { code: "+63", label: "Filipinas (+63)" },
    { code: "+358", label: "Finlandia (+358)" },
    { code: "+679", label: "Fiyi (+679)" },
    { code: "+33", label: "Francia (+33)" },
    { code: "+220", label: "Gambia (+220)" },
    { code: "+995", label: "Georgia (+995)" },
    { code: "+233", label: "Ghana (+233)" },
    { code: "+30", label: "Grecia (+30)" },
    { code: "+502", label: "Guatemala (+502)" },
    { code: "+224", label: "Guinea (+224)" },
    { code: "+592", label: "Guyana (+592)" },
    { code: "+509", label: "Haití (+509)" },
    { code: "+504", label: "Honduras (+504)" },
    { code: "+36", label: "Hungría (+36)" },
    { code: "+91", label: "India (+91)" },
    { code: "+62", label: "Indonesia (+62)" },
    { code: "+98", label: "Irán (+98)" },
    { code: "+964", label: "Irak (+964)" },
    { code: "+353", label: "Irlanda (+353)" },
    { code: "+354", label: "Islandia (+354)" },
    { code: "+972", label: "Israel (+972)" },
    { code: "+39", label: "Italia (+39)" },
    { code: "+1876", label: "Jamaica (+1876)" },
    { code: "+81", label: "Japón (+81)" },
    { code: "+962", label: "Jordania (+962)" },
    { code: "+7", label: "Kazajistán (+7)" },
    { code: "+254", label: "Kenia (+254)" },
    { code: "+82", label: "Corea del Sur (+82)" },
    { code: "+965", label: "Kuwait (+965)" },
    { code: "+996", label: "Kirguistán (+996)" },
    { code: "+856", label: "Laos (+856)" },
    { code: "+371", label: "Letonia (+371)" },
    { code: "+961", label: "Líbano (+961)" },
    { code: "+231", label: "Liberia (+231)" },
    { code: "+218", label: "Libia (+218)" },
    { code: "+423", label: "Liechtenstein (+423)" },
    { code: "+370", label: "Lituania (+370)" },
    { code: "+352", label: "Luxemburgo (+352)" },
    { code: "+389", label: "Macedonia del Norte (+389)" },
    { code: "+60", label: "Malasia (+60)" },
    { code: "+356", label: "Malta (+356)" },
    { code: "+52", label: "México (+52)" },
    { code: "+373", label: "Moldavia (+373)" },
    { code: "+377", label: "Mónaco (+377)" },
    { code: "+976", label: "Mongolia (+976)" },
    { code: "+212", label: "Marruecos (+212)" },
    { code: "+258", label: "Mozambique (+258)" },
    { code: "+977", label: "Nepal (+977)" },
    { code: "+505", label: "Nicaragua (+505)" },
    { code: "+234", label: "Nigeria (+234)" },
    { code: "+47", label: "Noruega (+47)" },
    { code: "+64", label: "Nueva Zelanda (+64)" },
    { code: "+31", label: "Países Bajos (+31)" },
    { code: "+507", label: "Panamá (+507)" },
    { code: "+595", label: "Paraguay (+595)" },
    { code: "+51", label: "Perú (+51)" },
    { code: "+48", label: "Polonia (+48)" },
    { code: "+351", label: "Portugal (+351)" },
    { code: "+974", label: "Catar (+974)" },
    { code: "+44", label: "Reino Unido (+44)" },
    { code: "+236", label: "República Centroafricana (+236)" },
    { code: "+420", label: "República Checa (+420)" },
    { code: "+40", label: "Rumania (+40)" },
    { code: "+7", label: "Rusia (+7)" },
    { code: "+221", label: "Senegal (+221)" },
    { code: "+381", label: "Serbia (+381)" },
    { code: "+65", label: "Singapur (+65)" },
    { code: "+963", label: "Siria (+963)" },
    { code: "+252", label: "Somalia (+252)" },
    { code: "+27", label: "Sudáfrica (+27)" },
    { code: "+82", label: "Corea del Sur (+82)" },
    { code: "+94", label: "Sri Lanka (+94)" },
    { code: "+46", label: "Suecia (+46)" },
    { code: "+41", label: "Suiza (+41)" },
    { code: "+66", label: "Tailandia (+66)" },
    { code: "+886", label: "Taiwán (+886)" },
    { code: "+255", label: "Tanzania (+255)" },
    { code: "+216", label: "Túnez (+216)" },
    { code: "+90", label: "Turquía (+90)" },
    { code: "+993", label: "Turkmenistán (+993)" },
    { code: "+380", label: "Ucrania (+380)" },
    { code: "+256", label: "Uganda (+256)" },
    { code: "+598", label: "Uruguay (+598)" },
    { code: "+998", label: "Uzbekistán (+998)" },
    { code: "+58", label: "Venezuela (+58)" },
    { code: "+84", label: "Vietnam (+84)" },
];


export default function ArtistSocialSection({
                                                socialTypes,
                                                socialValues,
                                                activeSocial,
                                                onChangeActiveSocial,
                                                onChangeSocialValue,
                                            }) {
    const currentSocial = socialTypes.find((s) => s.id === activeSocial);

    // Para WhatsApp, aseguramos estructura { code: "", number: "" }
    const whatsappValue = socialValues["whatsapp"] || { code: "+52", number: "" };

    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Redes sociales y contacto</legend>

            {/* ICONOS */}
            <div className={styles.socialIconsRow}>
                {socialTypes.map((opt) => {
                    const hasValue = socialValues[opt.id]
                        ? typeof socialValues[opt.id] === "string"
                            ? socialValues[opt.id].trim().length > 0
                            : socialValues[opt.id].number?.trim().length > 0
                        : false;

                    const isActive = activeSocial === opt.id;
                    const iconType = opt.id === "whatsapp" ? "whatsapp" : opt.id;

                    return (
                        <div
                            key={opt.id}
                            className={`${styles.socialIconWrapper} ${
                                isActive ? styles.socialIconActive : ""
                            }`}
                        >
                            <SocialIcon
                                type={iconType}
                                href="#"
                                invert={hasValue}
                                ariaLabel={opt.label}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChangeActiveSocial(opt.id);
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            <p className={styles.socialHint}>
                Toca un icono para agregar el usuario, enlace o número.
            </p>

            {/* ======================= WHATSAPP ESPECIAL ======================= */}
            {currentSocial?.id === "whatsapp" && (
                <div className={styles.socialField}>
                    <label className={styles.label}>Teléfono / WhatsApp</label>

                    <div className={styles.whatsappRow}>
                        {/* SELECT DE PAÍS */}
                        <select
                            className={styles.select}
                            value={whatsappValue.code}
                            onChange={(e) =>
                                onChangeSocialValue("whatsapp", {
                                    ...whatsappValue,
                                    code: e.target.value,
                                })
                            }
                        >
                            {PHONE_CODES.map((p, index) => (
                                <option
                                    key={`${p.code}-${index}`}
                                    value={p.code}
                                >
                                    {p.label}
                                </option>
                            ))}
                        </select>

                        {/* NÚMERO */}
                        <input
                            type="tel"
                            className={styles.input}
                            placeholder="Número sin prefijo"
                            value={whatsappValue.number}
                            onChange={(e) =>
                                onChangeSocialValue("whatsapp", {
                                    ...whatsappValue,
                                    number: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            )}

            {/* ================== RESTO DE REDES SOCIALES ================== */}
            {currentSocial &&
                currentSocial.id !== "whatsapp" && (
                    <div className={styles.socialField}>
                        <label
                            htmlFor={`social-${currentSocial.id}`}
                            className={styles.label}
                        >
                            {currentSocial.label}
                        </label>

                        <input
                            id={`social-${currentSocial.id}`}
                            type={
                                currentSocial.id === "email"
                                    ? "email"
                                    : "text"
                            }
                            className={styles.input}
                            value={socialValues[currentSocial.id] || ""}
                            onChange={(e) =>
                                onChangeSocialValue(currentSocial.id, e.target.value)
                            }
                            placeholder={currentSocial.placeholder}
                        />
                    </div>
                )}
        </fieldset>
    );
}
