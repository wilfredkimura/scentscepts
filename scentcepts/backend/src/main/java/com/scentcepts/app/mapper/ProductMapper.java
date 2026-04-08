package com.scentcepts.app.mapper;

import com.scentcepts.app.dto.ProductDto;
import com.scentcepts.app.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * MapStruct compile-time mapper for {@link Product}.
 * {@code unmappedTargetPolicy = IGNORE} prevents compile errors when the DTO
 * and entity diverge during feature iteration.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    /** Convert entity → response DTO */
    ProductDto toDto(Product entity);

    /** Convert request DTO → entity (for create) */
    Product toEntity(ProductDto dto);

    /** Bulk conversion for page content */
    List<ProductDto> toDtoList(List<Product> entities);

    /** Update an existing entity in-place from a DTO (for update operations) */
    @org.mapstruct.Mapping(target = "id", ignore = true)
    @org.mapstruct.Mapping(target = "brand", ignore = true)
    void updateEntityFromDto(ProductDto dto, @MappingTarget Product entity);
}
