package com.canicolectivo.caniweb.service.multimedia;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class LocalStorageService implements StorageService {

    private final Path rootLocation = Paths.get("uploads");

    // metodo para subir imagenes localmente
    @Override
    public String uploadImage(MultipartFile file) {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path destination = rootLocation.resolve(filename);
            Files.copy(file.getInputStream(), destination);

            return "/uploads/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
