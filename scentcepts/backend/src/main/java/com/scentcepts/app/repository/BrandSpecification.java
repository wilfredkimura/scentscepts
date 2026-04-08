package com.scentcepts.app.repository;

import com.scentcepts.app.dto.BrandFilter;
import com.scentcepts.app.entity.Brand;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * JPA Specification builder for {@link Brand}.
 * Uses a single {@code build(filter)} method so the predicate list never explodes.
 * Add a null-check for each field — if the filter field is null it is ignored.
 */
public class BrandSpecification {

    private BrandSpecification() {}

    public static Specification<Brand> build(BrandFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Exclude soft-deleted items by default
            predicates.add(cb.isNull(root.get("deletedAt")));

            // Filter by name
            if (filter.getName() != null) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"));
            }

            // Filter by logoUrl
            if (filter.getLogoUrl() != null) {
                predicates.add(cb.like(cb.lower(root.get("logoUrl")),
                        "%" + filter.getLogoUrl().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
