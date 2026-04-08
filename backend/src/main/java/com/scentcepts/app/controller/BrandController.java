package com.scentcepts.app.controller;

import java.util.UUID;

import com.scentcepts.app.dto.BrandDto;
import com.scentcepts.app.dto.BrandFilter;
import com.scentcepts.app.service.BrandService;
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
 * REST controller for {@link com.scentcepts.app.entity.Brand}.
 * This layer is intentionally thin — all business logic lives in the service.
 */
@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService service;

    /**
     * GET /api/v1/brands
     * Supports pagination: ?page=0&size=20&sort=id,desc
     * Supports filtering: ?name=value (any field in BrandFilter)
     */
    @GetMapping
    public ResponseEntity<Page<BrandDto>> getAll(
            @ModelAttribute BrandFilter filter,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDto> getById(@PathVariable UUID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BrandDto> create(@Valid @RequestBody BrandDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDto> update(
            @PathVariable UUID id,
            @Valid @RequestBody BrandDto dto
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
