package com.scentcepts.app.mapper;

import com.scentcepts.app.dto.ScentOrderDto;
import com.scentcepts.app.entity.ScentOrder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * MapStruct compile-time mapper for {@link ScentOrder}.
 * {@code unmappedTargetPolicy = IGNORE} prevents compile errors when the DTO
 * and entity diverge during feature iteration.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ScentOrderMapper {

    /** Convert entity → response DTO */
    ScentOrderDto toDto(ScentOrder entity);

    /** Convert request DTO → entity (for create) */
    ScentOrder toEntity(ScentOrderDto dto);

    /** Bulk conversion for page content */
    List<ScentOrderDto> toDtoList(List<ScentOrder> entities);

    /** Update an existing entity in-place from a DTO (for update operations) */
    @org.mapstruct.Mapping(target = "id", ignore = true)
    void updateEntityFromDto(ScentOrderDto dto, @MappingTarget ScentOrder entity);
}
