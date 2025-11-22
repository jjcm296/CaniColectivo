package com.canicolectivo.caniweb.service.multimedia;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String uploadImage(MultipartFile file);
}
