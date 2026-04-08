package com.scentcepts.app.dto;

import java.math.BigDecimal;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private UUID id;

    private String name;

    private String description;

    private String topNotes;

    private String middleNotes;

    private String baseNotes;

    private BigDecimal decantPrice;

    private BigDecimal fullBottlePrice;

    private String imageUrl;

    private Integer stockQuantity;

    private String availability;

    private BrandDto brand;

    private UUID brandId;
}

