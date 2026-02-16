package com.schustern.assetsmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "O nome do ativo é obrigatório")
    @Size(min = 2, message = "O nome deve ter pelo menos 2 caracteres")
    private String name;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "O número de série é obrigatório")
    private String serialNumber;

    @NotNull(message = "A data de aquisição é obrigatória")
    private LocalDate acquisitionDate;

    @NotBlank(message = "A categoria é obrigatória")
    private String category;

    @NotNull(message = "O status é obrigatório")
    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    @Column(length = 500)
    @Size(max = 500, message = "A descrição não pode exceder 500 caracteres")
    private String description;

    public Asset() {
    }

    public Asset(String name, String serialNumber, LocalDate acquisitionDate, String category, AssetStatus status,
            String description) {
        this.name = name;
        this.serialNumber = serialNumber;
        this.acquisitionDate = acquisitionDate;
        this.category = category;
        this.status = status;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public LocalDate getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public AssetStatus getStatus() {
        return status;
    }

    public void setStatus(AssetStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}