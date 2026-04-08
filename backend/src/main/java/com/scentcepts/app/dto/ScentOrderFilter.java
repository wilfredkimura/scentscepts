package com.scentcepts.app.dto;

import java.math.BigDecimal;

import lombok.Data;

/**
 * Filter criteria DTO for ScentOrder.
 * Pass these as query parameters, e.g. /api/v1/scentOrders?page=0&size=20
 */
@Data
public class ScentOrderFilter {

    /** Filter by totalAmount (nullable — omit to skip this filter) */
    private BigDecimal totalAmount;

    /** Filter by status (nullable — omit to skip this filter) */
    private String status;

    /** Filter by deliveryAddress (nullable — omit to skip this filter) */
    private String deliveryAddress;

}

