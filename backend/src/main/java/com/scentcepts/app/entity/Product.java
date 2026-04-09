package com.scentcepts.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "products")
public class Product extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String topNotes;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String middleNotes;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String baseNotes;

    @Column(nullable = false)
    private BigDecimal decantPrice;

    @Column(nullable = false)
    private BigDecimal fullBottlePrice;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    private String availability;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private LocalDateTime deletedAt;

}
