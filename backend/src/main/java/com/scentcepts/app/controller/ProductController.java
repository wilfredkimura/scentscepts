package com.scentcepts.app.controller;

import java.util.UUID;

import com.scentcepts.app.dto.ProductDto;
import com.scentcepts.app.dto.ProductFilter;
import com.scentcepts.app.service.ProductService;
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
 * REST controller for {@link com.scentcepts.app.entity.Product}.
 * This layer is intentionally thin — all business logic lives in the service.
 */
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    /**
     * GET /api/v1/products
     * Supports pagination: ?page=0&size=20&sort=id,desc
     * Supports filtering: ?name=value (any field in ProductFilter)
     */
    @GetMapping
    public ResponseEntity<Page<ProductDto>> getAll(
            @ModelAttribute ProductFilter filter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable UUID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(
            @PathVariable UUID id,
            @Valid @RequestBody ProductDto dto
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
