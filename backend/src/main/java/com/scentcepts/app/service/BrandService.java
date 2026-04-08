package com.scentcepts.app.service;

import java.util.UUID;

import com.scentcepts.app.dto.BrandDto;
import com.scentcepts.app.dto.BrandFilter;
import com.scentcepts.app.entity.Brand;
import com.scentcepts.app.mapper.BrandMapper;
import com.scentcepts.app.repository.BrandRepository;
import com.scentcepts.app.repository.BrandSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service for {@link Brand} CRUD operations.
 * Mapping is handled here (Controller → Service → Mapper → Entity) rather than
 * in the controller to keep the REST layer thin.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BrandService {

    private final BrandRepository repository;
    private final BrandMapper      mapper;

    /**
     * Returns a filtered, paginated page of entities.
     * All filter fields are optional — pass an empty filter to get all records.
     */
    public Page<BrandDto> findAll(BrandFilter filter, Pageable pageable) {
        Specification<Brand> spec = BrandSpecification.build(filter);
        return repository.findAll(spec, pageable).map(mapper::toDto);
    }

    public Optional<BrandDto> findById(UUID id) {
        return repository.findById(id)
                .filter(b -> b.getDeletedAt() == null)
                .map(mapper::toDto);
    }

    @Transactional
    public BrandDto create(BrandDto dto) {
        Brand entity = mapper.toEntity(dto);
        return mapper.toDto(repository.save(entity));
    }

    @Transactional
    public Optional<BrandDto> update(UUID id, BrandDto dto) {
        return repository.findById(id)
                .filter(b -> b.getDeletedAt() == null)
                .map(existing -> {
                    mapper.updateEntityFromDto(dto, existing);
                    return mapper.toDto(repository.save(existing));
                });
    }

    @Transactional
    public boolean deleteById(UUID id) {
        return repository.findById(id).map(brand -> {
            brand.setDeletedAt(LocalDateTime.now());
            repository.save(brand);
            return true;
        }).orElse(false);
    }
}
