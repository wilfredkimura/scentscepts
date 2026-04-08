package com.scentcepts.app.dto;

import java.math.BigDecimal;
import java.util.UUID;
import lombok.Data;

/**
 * Filter criteria DTO for Product.
 * Pass these as query parameters, e.g. /api/v1/products?page=0&size=20
 */
@Data
public class ProductFilter {

    /** Filter by name (nullable — omit to skip this filter) */
    private String name;

    /** Filter by brand ID (nullable) */
    private UUID brandId;

    /** Filter by description (nullable — omit to skip this filter) */
    private String description;

    /** Filter by topNotes (nullable — omit to skip this filter) */
    private String topNotes;

    /** Filter by middleNotes (nullable — omit to skip this filter) */
    private String middleNotes;

    /** Filter by baseNotes (nullable — omit to skip this filter) */
    private String baseNotes;

    /** Filter by decantPrice (nullable — omit to skip this filter) */
    private BigDecimal decantPrice;

    /** Filter by fullBottlePrice (nullable — omit to skip this filter) */
    private BigDecimal fullBottlePrice;

    /** Filter by imageUrl (nullable — omit to skip this filter) */
    private String imageUrl;

    /** Filter by stockQuantity (nullable — omit to skip this filter) */
    private Integer stockQuantity;

    /** Filter by availability (nullable — omit to skip this filter) */
    private String availability;

}
