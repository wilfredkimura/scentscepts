package com.scentcepts.app.service;

import java.util.UUID;

import com.scentcepts.app.dto.OrderItemDto;
import com.scentcepts.app.dto.OrderItemFilter;
import com.scentcepts.app.entity.OrderItem;
import com.scentcepts.app.mapper.OrderItemMapper;
import com.scentcepts.app.repository.OrderItemRepository;
import com.scentcepts.app.repository.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service for {@link OrderItem} CRUD operations.
 * Mapping is handled here (Controller → Service → Mapper → Entity) rather than
 * in the controller to keep the REST layer thin.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderItemService {

    private final OrderItemRepository repository;
    private final OrderItemMapper      mapper;

    /**
     * Returns a filtered, paginated page of entities.
     * All filter fields are optional — pass an empty filter to get all records.
     */
    public Page<OrderItemDto> findAll(OrderItemFilter filter, Pageable pageable) {
        Specification<OrderItem> spec = OrderItemSpecification.build(filter);
        return repository.findAll(spec, pageable).map(mapper::toDto);
    }

    public Optional<OrderItemDto> findById(UUID id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Transactional
    public OrderItemDto create(OrderItemDto dto) {
        OrderItem entity = mapper.toEntity(dto);
        return mapper.toDto(repository.save(entity));
    }

    @Transactional
    public Optional<OrderItemDto> update(UUID id, OrderItemDto dto) {
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
