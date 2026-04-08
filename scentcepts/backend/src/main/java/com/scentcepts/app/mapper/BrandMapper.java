package com.scentcepts.app.mapper;

import com.scentcepts.app.dto.BrandDto;
import com.scentcepts.app.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * MapStruct compile-time mapper for {@link Brand}.
 * {@code unmappedTargetPolicy = IGNORE} prevents compile errors when the DTO
 * and entity diverge during feature iteration.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BrandMapper {

    /** Convert entity → response DTO */
    BrandDto toDto(Brand entity);

    /** Convert request DTO → entity (for create) */
    Brand toEntity(BrandDto dto);

    /** Bulk conversion for page content */
    List<BrandDto> toDtoList(List<Brand> entities);

    /** Update an existing entity in-place from a DTO (for update operations) */
    void updateEntityFromDto(BrandDto dto, @MappingTarget Brand entity);
}
