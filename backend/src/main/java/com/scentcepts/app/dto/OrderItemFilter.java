package com.scentcepts.app.dto;

import java.math.BigDecimal;

import lombok.Data;

/**
 * Filter criteria DTO for OrderItem.
 * Pass these as query parameters, e.g. /api/v1/orderItems?page=0&size=20
 */
@Data
public class OrderItemFilter {

    /** Filter by size (nullable — omit to skip this filter) */
    private String size;

    /** Filter by quantity (nullable — omit to skip this filter) */
    private Integer quantity;

    /** Filter by priceAtPurchase (nullable — omit to skip this filter) */
    private BigDecimal priceAtPurchase;

}

