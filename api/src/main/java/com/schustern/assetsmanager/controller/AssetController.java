package com.schustern.assetsmanager.controller;

import com.schustern.assetsmanager.model.Asset;
import com.schustern.assetsmanager.repository.AssetRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/assets")
@CrossOrigin(origins = "*")
public class AssetController {

    @Autowired
    private AssetRepository repository;

    private String formatValidationErrors(BindingResult result) {
        return result.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining("; "));
    }

    // GET
    @GetMapping
    public List<Asset> getAllAssets() {
        return repository.findAll();
    }

    // POST
    @PostMapping
    public ResponseEntity<?> createAsset(@Valid @RequestBody Asset asset, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(formatValidationErrors(result));
        }

        if (repository.existsBySerialNumber(asset.getSerialNumber())) {
            return ResponseEntity.badRequest().body("Erro: Já existe um ativo com este Número de Série.");
        }

        Asset novoAsset = repository.save(asset);
        return ResponseEntity.ok(novoAsset);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable Long id, @Valid @RequestBody Asset updatedAsset,
            BindingResult result) {

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(formatValidationErrors(result));
        }

        Asset existingAsset = repository.findById(id).orElse(null);
        if (existingAsset == null) {
            return ResponseEntity.notFound().build();
        }

        if (repository.existsBySerialNumberAndIdNot(updatedAsset.getSerialNumber(), id)) {
            return ResponseEntity.badRequest().body("Erro: Este Número de Série já está em uso por outro ativo.");
        }

        existingAsset.setName(updatedAsset.getName());
        existingAsset.setCategory(updatedAsset.getCategory());
        existingAsset.setAcquisitionDate(updatedAsset.getAcquisitionDate());
        existingAsset.setSerialNumber(updatedAsset.getSerialNumber());
        existingAsset.setDescription(updatedAsset.getDescription());
        existingAsset.setStatus(updatedAsset.getStatus());

        Asset saved = repository.save(existingAsset);
        return ResponseEntity.ok(saved);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        return repository.findById(id)
                .map(asset -> {
                    repository.delete(asset);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}