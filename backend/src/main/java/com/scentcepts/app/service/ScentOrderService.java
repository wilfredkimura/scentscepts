package com.scentcepts.app.service;

import java.util.UUID;

import com.scentcepts.app.dto.ScentOrderDto;
import com.scentcepts.app.dto.ScentOrderFilter;
import com.scentcepts.app.entity.ScentOrder;
import com.scentcepts.app.mapper.ScentOrderMapper;
import com.scentcepts.app.repository.ScentOrderRepository;
import com.scentcepts.app.repository.ScentOrderSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service for {@link ScentOrder} CRUD operations.
 * Mapping is handled here (Controller → Service → Mapper → Entity) rather than
 * in the controller to keep the REST layer thin.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScentOrderService {

    private final ScentOrderRepository repository;
    private final ScentOrderMapper      mapper;

    /**
     * Returns a filtered, paginated page of entities.
     * All filter fields are optional — pass an empty filter to get all records.
     */
    public Page<ScentOrderDto> findAll(ScentOrderFilter filter, Pageable pageable) {
        Specification<ScentOrder> spec = ScentOrderSpecification.build(filter);
        return repository.findAll(spec, pageable).map(mapper::toDto);
    }

    public Optional<ScentOrderDto> findById(UUID id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Transactional
    public ScentOrderDto create(ScentOrderDto dto) {
        ScentOrder entity = mapper.toEntity(dto);
        return mapper.toDto(repository.save(entity));
    }

    @Transactional
    public Optional<ScentOrderDto> update(UUID id, ScentOrderDto dto) {
        return repository.findById(id).map(existing -> {
            mapper.updateEntityFromDto(dto, existing);
            return mapper.toDto(repository.save(existing));
        });
    }

    @Transactional
    public boolean deleteById(UUID id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
