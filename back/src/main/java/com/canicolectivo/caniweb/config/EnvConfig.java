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

        Map<String, String> envVars = new HashMap<>();
        // Cargar las variables desde el archivo .env
        Dotenv dotenv = Dotenv.load();

        // Establecer las variables como propiedades del sistema
        envVars.put("CLOUDFLARE_ACCESS_KEY", dotenv.get("CLOUDFLARE_ACCESS_KEY"));
        envVars.put("CLOUDFLARE_SECRET_KEY", dotenv.get("CLOUDFLARE_SECRET_KEY"));
        envVars.put("CLOUDFLARE_BUCKET_NAME", dotenv.get("CLOUDFLARE_BUCKET_NAME"));
        envVars.put("CLOUDFLARE_S3_ENDPOINT", dotenv.get("CLOUDFLARE_S3_ENDPOINT"));
        envVars.put("CLOUDFLARE_PUBLIC_URL", dotenv.get("CLOUDFLARE_PUBLIC_URL"));

        System.setProperty("CLOUDFLARE_ACCESS_KEY", dotenv.get("CLOUDFLARE_ACCESS_KEY"));
        System.setProperty("CLOUDFLARE_SECRET_KEY", dotenv.get("CLOUDFLARE_SECRET_KEY"));
        System.setProperty("CLOUDFLARE_BUCKET_NAME", dotenv.get("CLOUDFLARE_BUCKET_NAME"));
        System.setProperty("CLOUDFLARE_S3_ENDPOINT", dotenv.get("CLOUDFLARE_S3_ENDPOINT"));
        System.setProperty("CLOUDFLARE_PUBLIC_URL", dotenv.get("CLOUDFLARE_PUBLIC_URL"));

        return envVars;
    }
}
