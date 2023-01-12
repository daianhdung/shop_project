package com.example.shop_project.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    boolean storedFile(MultipartFile file);

    Resource loadFileByName(String fileName);
}
