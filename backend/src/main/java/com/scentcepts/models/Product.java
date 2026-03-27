package com.scentcepts.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
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
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}
