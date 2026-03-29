package com.scentcepts.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Brand brand;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @Column(name = "top_notes")
    private String topNotes;
    
    @Column(name = "middle_notes")
    private String middleNotes;
    
    @Column(name = "base_notes")
    private String baseNotes;
    
    @Column(name = "decant_price", nullable = false)
    private BigDecimal decantPrice;
    
    @Column(name = "full_bottle_price", nullable = false)
    private BigDecimal fullBottlePrice;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;
    
    @Column(nullable = false)
    private String availability = "AVAILABLE";
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();
    
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt = ZonedDateTime.now();
    
    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;
    
    public Product() {}

    public Product(UUID id, Brand brand, String name, String description, String topNotes, String middleNotes, String baseNotes, BigDecimal decantPrice, BigDecimal fullBottlePrice, String imageUrl, Integer stockQuantity, String availability, ZonedDateTime createdAt, ZonedDateTime updatedAt, ZonedDateTime deletedAt) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.description = description;
        this.topNotes = topNotes;
        this.middleNotes = middleNotes;
        this.baseNotes = baseNotes;
        this.decantPrice = decantPrice;
        this.fullBottlePrice = fullBottlePrice;
        this.imageUrl = imageUrl;
        this.stockQuantity = stockQuantity;
        this.availability = availability;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Brand getBrand() { return brand; }
    public void setBrand(Brand brand) { this.brand = brand; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTopNotes() { return topNotes; }
    public void setTopNotes(String topNotes) { this.topNotes = topNotes; }
    public String getMiddleNotes() { return middleNotes; }
    public void setMiddleNotes(String middleNotes) { this.middleNotes = middleNotes; }
    public String getBaseNotes() { return baseNotes; }
    public void setBaseNotes(String baseNotes) { this.baseNotes = baseNotes; }
    public BigDecimal getDecantPrice() { return decantPrice; }
    public void setDecantPrice(BigDecimal decantPrice) { this.decantPrice = decantPrice; }
    public BigDecimal getFullBottlePrice() { return fullBottlePrice; }
    public void setFullBottlePrice(BigDecimal fullBottlePrice) { this.fullBottlePrice = fullBottlePrice; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
    public ZonedDateTime getDeletedAt() { return deletedAt; }
    public void setDeletedAt(ZonedDateTime deletedAt) { this.deletedAt = deletedAt; }
}
