package com.canicolectivo.caniweb.service.multimedia;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URI;

@Service
public class CloudflareService {

    private final String bucketName;
    private final String publicUrl;
    private final S3Client s3Client;

    public CloudflareService() {
        Dotenv dotenv = Dotenv.load();

        // ---- Endpoint interno para SUBIR archivos (S3 API) ----
        String s3Endpoint = dotenv.get("CLOUDFLARE_S3_ENDPOINT");

        // ---- URL pública para mostrar imágenes ----
        this.publicUrl = dotenv.get("CLOUDFLARE_PUBLIC_URL");

        this.bucketName = dotenv.get("CLOUDFLARE_BUCKET_NAME");
        String access   = dotenv.get("CLOUDFLARE_ACCESS_KEY");
        String secret   = dotenv.get("CLOUDFLARE_SECRET_KEY");

        AwsBasicCredentials creds = AwsBasicCredentials.create(access, secret);

        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(s3Endpoint))
                .region(Region.of("auto"))
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .build();
    }

    public String uploadImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("No file selected or file is empty");
        }

        String key = "banners/" + file.getOriginalFilename();

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            return publicUrl + "/" + key;

        } catch (Exception e) {
            throw new IOException("Error uploading file to Cloudflare R2: " + e.getMessage(), e);
        }
    }
}
