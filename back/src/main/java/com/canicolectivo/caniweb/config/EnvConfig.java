package com.canicolectivo.caniweb.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class EnvConfig {

    @Bean
    public Map<String, String> loadEnvVariables() {

        // Cargar .env solo si existe (no falla en producción)
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .ignoreIfMalformed()
                .load();

        Map<String, String> envVars = new HashMap<>();

        // Claves que usas
        String[] keys = {
                "CLOUDFLARE_ACCESS_KEY",
                "CLOUDFLARE_SECRET_KEY",
                "CLOUDFLARE_BUCKET_NAME",
                "CLOUDFLARE_S3_ENDPOINT",
                "CLOUDFLARE_PUBLIC_URL"
        };

        for (String key : keys) {
            // 1) Intentar obtener desde variables de entorno del sistema (Render)
            String value = System.getenv(key);

            // 2) Si no existe, obtener del archivo .env (solo local)
            if (value == null || value.isBlank()) {
                value = dotenv.get(key);
            }

            // 3) Si sigue sin existir → error claro
            if (value == null || value.isBlank()) {
                throw new IllegalStateException("Missing required environment variable: " + key);
            }

            // Guardarlo en el Map (tu retorno del Bean)
            envVars.put(key, value);

            // Y si necesitas System property:
            System.setProperty(key, value);
        }

        return envVars;
    }
}
