import React from "react";
import styles from "./TiktokVideoCard.module.css";

const extractVideoId = (url) => {
    if (!url) return "";
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
};

const TiktokVideoCard = ({ url }) => {
    const videoId = extractVideoId(url);

    const embedUrl = videoId
        ? `https://www.tiktok.com/embed/v2/${videoId}?lang=es&autoplay=1&mute=0`
        : "";

    return (
        <div className={styles.videoWrapper}>
            {embedUrl ? (
                <iframe
                    key={videoId}
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                <div className={styles.placeholder}>Video no disponible</div>
            )}
        </div>
    );
};

export default TiktokVideoCard;
