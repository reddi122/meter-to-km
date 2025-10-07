package com.example.converter;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ConverterController {

    @GetMapping("/convert")
    public ResponseEntity<Map<String, Object>> convertMetersToKm(@RequestParam("meters") double meters) {
        double kilometers = meters / 1000.0;
        double rounded = Math.round(kilometers * 1_000_000d) / 1_000_000d;
        return ResponseEntity.ok(Map.of(
                "meters", meters,
                "kilometers", rounded,
                "rawKilometers", kilometers
        ));
    }
}
