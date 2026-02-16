package com.schustern.assetsmanager.controller;

import com.schustern.assetsmanager.model.Asset;
import com.schustern.assetsmanager.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
@CrossOrigin(origins = "*") // Libera acesso para o Front-end
public class AssetController {

    @Autowired
    private AssetRepository repository;

    // GET
    @GetMapping
    public List<Asset> getAllAssets() {
        return repository.findAll();
    }

    // POST
    @PostMapping
    public ResponseEntity<?> createAsset(@RequestBody Asset asset) {
        if (repository.existsBySerialNumber(asset.getSerialNumber())) {
            return ResponseEntity.badRequest().body("Erro: Já existe um ativo com este Número de Série.");
        }
        Asset novoAsset = repository.save(asset);
        return ResponseEntity.ok(novoAsset);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable Long id, @RequestBody Asset assetAtualizado) {
        return repository.findById(id)
                .map(asset -> {
                    asset.setName(assetAtualizado.getName());
                    asset.setCategory(assetAtualizado.getCategory());
                    asset.setAcquisitionDate(assetAtualizado.getAcquisitionDate());
                    asset.setSerialNumber(assetAtualizado.getSerialNumber());
                    asset.setDescription(assetAtualizado.getDescription());
                    asset.setStatus(assetAtualizado.getStatus());
                    Asset atualizado = repository.save(asset);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
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