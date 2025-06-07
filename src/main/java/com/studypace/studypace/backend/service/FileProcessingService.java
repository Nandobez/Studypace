package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.StudyFile;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class FileProcessingService {

    public String extractTextContent(StudyFile file) {
        if (file.getFileContent() == null || file.getFileContent().length == 0) {
            return "";
        }

        try {
            BodyContentHandler handler = new BodyContentHandler(1000000); // Limit to 1MB
            AutoDetectParser parser = new AutoDetectParser();
            Metadata metadata = new Metadata();
            parser.parse(new ByteArrayInputStream(file.getFileContent()), handler, metadata);
            return handler.toString().trim();
        } catch (IOException | SAXException | TikaException e) {
            throw new RuntimeException("Error extracting content from file: " + file.getOriginalFilename(), e);
        }
    }
}