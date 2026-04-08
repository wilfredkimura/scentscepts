package com.scentcepts.app.dto;

import lombok.Data;

/**
 * Filter criteria DTO for Brand.
 * Pass these as query parameters, e.g. /api/v1/brands?page=0&size=20
 */
@Data
public class BrandFilter {

    /** Filter by name (nullable — omit to skip this filter) */
    private String name;

    /** Filter by logoUrl (nullable — omit to skip this filter) */
    private String logoUrl;

}
