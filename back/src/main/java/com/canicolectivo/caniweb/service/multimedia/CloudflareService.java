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
        Dotenv dotenv = Dotenv.load();

        // Endpoint interno para SUBIR archivos (API S3 de Cloudflare)
        String s3Endpoint = dotenv.get("CLOUDFLARE_S3_ENDPOINT");

        // URL pública base para mostrar las imágenes
        this.publicUrl = dotenv.get("CLOUDFLARE_PUBLIC_URL");

        this.bucketName = dotenv.get("CLOUDFLARE_BUCKET_NAME");
        String access   = dotenv.get("CLOUDFLARE_ACCESS_KEY");
        String secret   = dotenv.get("CLOUDFLARE_SECRET_KEY");

        AwsBasicCredentials creds = AwsBasicCredentials.create(access, secret);

        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(s3Endpoint))
                .region(Region.of("auto")) // Cloudflare usa región "auto"
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .build();
    }

    // ============================================================
    // SUBIR IMAGEN A CLOUDFLARE R2
    // ============================================================
    public String uploadImage(MultipartFile file) throws IOException {

        // ==========================
        // GENERAR KEY ÚNICO
        // ==========================
        // Antes: banners/ + nombreOriginal  (sobrescribía si se repetía el nombre)
        // Ahora: banners/ + UUID + extensión (siempre es único)
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf(".")); // incluye el punto, ej: ".jpeg"
        }

        // Ejemplo final: banners/550e8400-e29b-41d4-a716-446655440000.jpeg
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
            return; // nada que borrar
        }

        if (!url.startsWith(publicUrl)) {
            throw new IOException("La URL no pertenece a la URL pública configurada de Cloudflare");
        }

        // Extrae el key quitando la parte de la URL base
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
