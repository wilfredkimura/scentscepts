package com.scentcepts.app.mapper;

import com.scentcepts.app.dto.OrderItemDto;
import com.scentcepts.app.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * MapStruct compile-time mapper for {@link OrderItem}.
 * {@code unmappedTargetPolicy = IGNORE} prevents compile errors when the DTO
 * and entity diverge during feature iteration.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderItemMapper {

    /** Convert entity → response DTO */
    OrderItemDto toDto(OrderItem entity);

    /** Convert request DTO → entity (for create) */
    OrderItem toEntity(OrderItemDto dto);

    /** Bulk conversion for page content */
    List<OrderItemDto> toDtoList(List<OrderItem> entities);

    /** Update an existing entity in-place from a DTO (for update operations) */
    @org.mapstruct.Mapping(target = "id", ignore = true)
    void updateEntityFromDto(OrderItemDto dto, @MappingTarget OrderItem entity);
}
