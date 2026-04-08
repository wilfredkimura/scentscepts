package com.scentcepts.app.controller;

import java.util.UUID;

import com.scentcepts.app.dto.OrderItemDto;
import com.scentcepts.app.dto.OrderItemFilter;
import com.scentcepts.app.service.OrderItemService;
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
 * REST controller for {@link com.scentcepts.app.entity.OrderItem}.
 * This layer is intentionally thin — all business logic lives in the service.
 */
@RestController
@RequestMapping("/api/v1/orderItems")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService service;

    /**
     * GET /api/v1/orderItems
     * Supports pagination: ?page=0&size=20&sort=id,desc
     * Supports filtering: ?size=value (any field in OrderItemFilter)
     */
    @GetMapping
    public ResponseEntity<Page<OrderItemDto>> getAll(
            @ModelAttribute OrderItemFilter filter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemDto> getById(@PathVariable UUID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrderItemDto> create(@Valid @RequestBody OrderItemDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItemDto> update(
            @PathVariable UUID id,
            @Valid @RequestBody OrderItemDto dto
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
