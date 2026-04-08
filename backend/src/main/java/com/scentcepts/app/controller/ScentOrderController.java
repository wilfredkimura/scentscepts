package com.scentcepts.app.controller;

import java.util.UUID;

import com.scentcepts.app.dto.ScentOrderDto;
import com.scentcepts.app.dto.ScentOrderFilter;
import com.scentcepts.app.service.ScentOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for {@link com.scentcepts.app.entity.ScentOrder}.
 * This layer is intentionally thin — all business logic lives in the service.
 */
@RestController
@RequestMapping("/api/v1/scentOrders")
@RequiredArgsConstructor
public class ScentOrderController {

    private final ScentOrderService service;

    /**
     * GET /api/v1/scentOrders
     * Supports pagination: ?page=0&size=20&sort=id,desc
     * Supports filtering: ?totalAmount=value (any field in ScentOrderFilter)
     */
    @GetMapping
    public ResponseEntity<Page<ScentOrderDto>> getAll(
            @ModelAttribute ScentOrderFilter filter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScentOrderDto> getById(@PathVariable UUID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ScentOrderDto> create(@Valid @RequestBody ScentOrderDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScentOrderDto> update(
            @PathVariable UUID id,
            @Valid @RequestBody ScentOrderDto dto
    ) {
        return service.update(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return service.deleteById(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
