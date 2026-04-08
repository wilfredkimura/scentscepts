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
public class OrderItemDto {

    private UUID id;

    private String size;

    private Integer quantity;

    private BigDecimal priceAtPurchase;

}

