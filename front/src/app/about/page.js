import styles from "./AboutPage.module.css";

export default function AboutPage() {
    return (
        <main className="page-container">
            <div className={styles.shell}>
                {/* ===== HERO / INTRO ===== */}
                <section className={styles.hero}>
                    <div className={styles.heroBadgeRow}>
                        <span className={styles.heroBadge}>Colectivo cultural</span>
                        <span className={styles.heroLocation}>Coatzacoalcos, Veracruz</span>
                    </div>

                    <div className={styles.heroMain}>
                        <div className={styles.heroTextBlock}>
                            <h1 className={styles.heroTitle}>
                                CANI: Colectivo de Artistas Novatos Independientes
                            </h1>
                            <p className={styles.heroLead}>
                                Somos un colectivo de gestión cultural y organización de eventos dedicado
                                a la promoción, difusión y apoyo del arte y la cultura local. Impulsamos
                                talentos emergentes creando espacios profesionales donde puedan compartir
                                su trabajo y conectar con la comunidad.
                            </p>

                            <div className={styles.heroChips}>
                                <span className={styles.heroChip}>Gestión cultural</span>
                                <span className={styles.heroChip}>Eventos en vivo</span>
                                <span className={styles.heroChip}>Talento emergente</span>
                            </div>
                        </div>

                        <aside className={styles.heroPanel}>
                            <p className={styles.heroPanelLabel}>Lo que hacemos</p>
                            <ul className={styles.heroPanelList}>
                                <li>Organización de eventos culturales y artísticos</li>
                                <li>Plataforma independiente para talentos emergentes</li>
                                <li>Conexión entre artistas, públicos y espacios locales</li>
                            </ul>
                        </aside>
                    </div>
                </section>

                {/* ===== HISTORIA (TIMELINE) ===== */}
                <section className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.sectionKicker}>Nuestro origen</p>
                        <h2 className={styles.sectionTitle}>Historia de CANI</h2>
                        <p className={styles.sectionIntro}>
                            Así nació y creció el colectivo, respondiendo a la necesidad real de
                            darle visibilidad al talento local.
                        </p>
                    </header>

                    <div className={styles.timeline}>
                        <article className={styles.timelineItem}>
                            <div className={styles.timelineMarker} aria-hidden="true" />
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineTitle}>De idea a colectivo</h3>
                                <p className={styles.timelineText}>
                                    El nombre <strong>CANI</strong> es el acrónimo de{" "}
                                    <strong>Colectivo de Artistas Novatos Independientes</strong>. Surge de la
                                    necesidad de crear una plataforma genuina para la expresión artística
                                    en la región.
                                </p>
                            </div>
                        </article>

                        <article className={styles.timelineItem}>
                            <div className={styles.timelineMarker} aria-hidden="true" />
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineTitle}>Primeros pasos</h3>
                                <p className={styles.timelineText}>
                                    El origen se remonta a la organización espontánea de pequeños eventos
                                    musicales. Estos encuentros demostraron el interés palpable por espacios
                                    donde el arte local pudiera mostrarse sin filtros.
                                </p>
                            </div>
                        </article>

                        <article className={styles.timelineItem}>
                            <div className={styles.timelineMarker} aria-hidden="true" />
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineTitle}>“Melodías de Picnic”</h3>
                                <p className={styles.timelineText}>
                                    El esfuerzo inicial culminó con el lanzamiento de{" "}
                                    <strong>“Melodías de Picnic”</strong>, el primer evento de gran alcance
                                    del colectivo. Este hito evidenció el enorme potencial y la alta demanda
                                    de espacios de difusión cultural en Coatzacoalcos.
                                </p>
                            </div>
                        </article>

                        <article className={styles.timelineItem}>
                            <div className={styles.timelineMarker} aria-hidden="true" />
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineTitle}>Respuesta a una necesidad real</h3>
                                <p className={styles.timelineText}>
                                    CANI nació como respuesta directa a la falta de apoyo y visibilidad que
                                    enfrentan los artistas locales, ofreciendo estructura, acompañamiento y
                                    amplificación para que sus proyectos puedan desarrollarse
                                    profesionalmente.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                {/* ===== MISIÓN Y VISIÓN ===== */}
                <section className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.sectionKicker}>Hacia dónde vamos</p>
                        <h2 className={styles.sectionTitle}>Misión y visión</h2>
                    </header>

                    <div className={styles.mvGrid}>
                        <article className={styles.mvCard}>
                            <span className={`${styles.mvTag} ${styles.mvTagMission}`}>
                                Misión
                            </span>
                            <h3 className={styles.mvTitle}>Conectar talento con comunidad</h3>
                            <p className={styles.mvText}>
                                Nuestra misión es conectar directamente el talento local de Coatzacoalcos con
                                su audiencia, sirviendo como el puente esencial entre creadores y comunidad.
                            </p>
                            <p className={styles.mvText}>
                                No solo buscamos difundir la obra en plataformas digitales, sino también
                                proveer los espacios, foros y escenarios físicos necesarios para presentar
                                proyectos, profesionalizar el trabajo y fortalecer el ecosistema cultural de
                                la región.
                            </p>
                        </article>

                        <article className={styles.mvCard}>
                            <span className={`${styles.mvTag} ${styles.mvTagVision}`}>
                                Visión
                            </span>
                            <h3 className={styles.mvTitle}>Un nodo cultural en el sureste</h3>
                            <p className={styles.mvText}>
                                Aspiramos a ser reconocidos como el principal gestor cultural de enlace en el
                                sureste de México, ampliando el alcance de CANI más allá de Coatzacoalcos.
                            </p>
                            <p className={styles.mvText}>
                                Buscamos atraer y apoyar a artistas de otras regiones del país, creando un
                                ecosistema de colaboración donde la escena local conviva con proyectos de la
                                escena nacional mediante eventos y plataformas inclusivas.
                            </p>
                        </article>
                    </div>
                </section>

                {/* ===== VALORES ===== */}
                <section className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <p className={styles.sectionKicker}>Lo que nos define</p>
                        <h2 className={styles.sectionTitle}>Valores</h2>
                        <p className={styles.sectionIntro}>
                            Nuestros principios guían cada evento, colaboración e interacción con la
                            comunidad artística.
                        </p>
                    </header>

                    <div className={styles.valuesGrid}>
                        <article className={styles.valueCard}>
                            <span
                                className={`${styles.valuePill} ${styles.valuePillInclusion}`}
                            >
                                Inclusión cultural
                            </span>
                            <p className={styles.valueText}>
                                Creación de espacios accesibles y libres de prejuicios para todas las
                                disciplinas, estéticas y trayectorias.
                            </p>
                        </article>

                        <article className={styles.valueCard}>
                            <span
                                className={`${styles.valuePill} ${styles.valuePillPassion}`}
                            >
                                Pasión y compromiso
                            </span>
                            <p className={styles.valueText}>
                                Entusiasmo genuino por el arte y un compromiso constante con la calidad y el
                                cuidado en cada evento.
                            </p>
                        </article>

                        <article className={styles.valueCard}>
                            <span
                                className={`${styles.valuePill} ${styles.valuePillIndep}`}
                            >
                                Independencia
                            </span>
                            <p className={styles.valueText}>
                                Autonomía para tomar decisiones que beneficien directamente a las personas
                                creadoras y al tejido cultural local.
                            </p>
                        </article>

                        <article className={styles.valueCard}>
                            <span
                                className={`${styles.valuePill} ${styles.valuePillTransp}`}
                            >
                                Transparencia
                            </span>
                            <p className={styles.valueText}>
                                Comunicación clara y honesta con artistas, equipo y audiencia en cada etapa
                                del proceso.
                            </p>
                        </article>

                        <article className={styles.valueCard}>
                            <span
                                className={`${styles.valuePill} ${styles.valuePillCommunity}`}
                            >
                                Conexión comunitaria
                            </span>
                            <p className={styles.valueText}>
                                Fortalecer los lazos entre artistas, audiencias, colectivos y negocios
                                locales, construyendo comunidad a través del arte.
                            </p>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
}
