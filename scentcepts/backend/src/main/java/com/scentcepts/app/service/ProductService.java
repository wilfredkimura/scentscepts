package com.scentcepts.app.service;

import java.util.UUID;

import com.scentcepts.app.dto.ProductDto;
import com.scentcepts.app.dto.ProductFilter;
import com.scentcepts.app.entity.Product;
import com.scentcepts.app.mapper.ProductMapper;
import com.scentcepts.app.repository.ProductRepository;
import com.scentcepts.app.repository.ProductSpecification;
import com.scentcepts.app.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service for {@link Product} CRUD operations.
 * Mapping is handled here (Controller → Service → Mapper → Entity) rather than
 * in the controller to keep the REST layer thin.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository repository;
    private final BrandRepository brandRepository;
    private final ProductMapper      mapper;

    /**
     * Returns a filtered, paginated page of entities.
     * All filter fields are optional — pass an empty filter to get all records.
     */
    public Page<ProductDto> findAll(ProductFilter filter, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.build(filter);
        return repository.findAll(spec, pageable).map(mapper::toDto);
    }

    public Optional<ProductDto> findById(UUID id) {
        return repository.findById(id)
                .filter(p -> p.getDeletedAt() == null)
                .map(mapper::toDto);
    }

    @Transactional
    public ProductDto create(ProductDto dto) {
        Product entity = mapper.toEntity(dto);
        if (dto.getBrandId() != null) {
            brandRepository.findById(dto.getBrandId()).ifPresent(entity::setBrand);
        }
        return mapper.toDto(repository.save(entity));
    }

    @Transactional
    public Optional<ProductDto> update(UUID id, ProductDto dto) {
        return repository.findById(id)
                .filter(p -> p.getDeletedAt() == null)
                .map(existing -> {
                    mapper.updateEntityFromDto(dto, existing);
                    if (dto.getBrandId() != null) {
                        brandRepository.findById(dto.getBrandId()).ifPresent(existing::setBrand);
                    }
                    return mapper.toDto(repository.save(existing));
                });
    }

    @Transactional
    public boolean deleteById(UUID id) {
        return repository.findById(id).map(product -> {
            product.setDeletedAt(LocalDateTime.now());
            repository.save(product);
            return true;
        }).orElse(false);
    }
}
