package com.canicolectivo.caniweb.service.multimedia;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URI;
import java.util.UUID;

@Service
public class CloudflareService {

    private final String bucketName;
    private final String publicUrl;
    private final S3Client s3Client;

    public CloudflareService() {
        // 1) Cargar .env SOLO si existe, sin tronar
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()    // en Render no habrá .env
                .ignoreIfMalformed()  // por si acaso
                .load();

        // Leer primero de variables de entorno (Render), si no, del .env (local)
        String s3Endpoint = getConfig("CLOUDFLARE_S3_ENDPOINT", dotenv);
        this.publicUrl   = getConfig("CLOUDFLARE_PUBLIC_URL", dotenv);
        this.bucketName  = getConfig("CLOUDFLARE_BUCKET_NAME", dotenv);
        String access    = getConfig("CLOUDFLARE_ACCESS_KEY", dotenv);
        String secret    = getConfig("CLOUDFLARE_SECRET_KEY", dotenv);

        AwsBasicCredentials creds = AwsBasicCredentials.create(access, secret);

        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(s3Endpoint))
                .region(Region.of("auto")) // Cloudflare usa región "auto"
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .build();
    }

    /**
     * Intenta leer primero de System.getenv() (Render),
     * si no existe, lo toma del archivo .env (local).
     * Si no está en ninguno, lanza error claro.
     */
    private String getConfig(String key, Dotenv dotenv) {
        String fromEnv = System.getenv(key);
        if (fromEnv != null && !fromEnv.isBlank()) {
            return fromEnv;
        }

        String fromDotenv = dotenv.get(key);
        if (fromDotenv != null && !fromDotenv.isBlank()) {
            return fromDotenv;
        }

        throw new IllegalStateException("Missing required config: " + key);
    }

    // ============================================================
    // SUBIR IMAGEN A CLOUDFLARE R2
    // ============================================================
    public String uploadImage(MultipartFile file) throws IOException {

        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf(".")); // ".jpeg", ".png", etc.
        }

        String key = "banners/" + UUID.randomUUID() + extension;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            // URL pública que se guarda en BD y usa el frontend
            return publicUrl + "/" + key;

        } catch (Exception e) {
            throw new IOException("Error al subir archivo a Cloudflare R2: " + e.getMessage(), e);
        }
    }

    // ============================================================
    // ELIMINAR IMAGEN POR URL PÚBLICA
    // ============================================================
    public void deleteByUrl(String url) throws IOException {
        if (url == null || url.isBlank()) {
            return;
        }

        if (!url.startsWith(publicUrl)) {
            throw new IOException("La URL no pertenece a la URL pública configurada de Cloudflare");
        }

        String key = url.substring(publicUrl.length() + 1); // +1 por la barra "/"
        deleteByKey(key);
    }

    // ============================================================
    // ELIMINAR IMAGEN POR KEY DIRECTO
    // ============================================================
    public void deleteByKey(String key) throws IOException {
        if (key == null || key.isBlank()) {
            return;
        }

        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);

        } catch (Exception e) {
            throw new IOException("Error al eliminar archivo de Cloudflare R2: " + e.getMessage(), e);
        }
    }
}
