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
public class ScentOrderDto {

    private UUID id;

    private BigDecimal totalAmount;

    private String status;

    private String deliveryAddress;

}

