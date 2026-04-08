package com.scentcepts.app.repository;

import com.scentcepts.app.dto.ProductFilter;
import com.scentcepts.app.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * JPA Specification builder for {@link Product}.
 * Uses a single {@code build(filter)} method so the predicate list never explodes.
 * Add a null-check for each field — if the filter field is null it is ignored.
 */
public class ProductSpecification {

    private ProductSpecification() {}

    public static Specification<Product> build(ProductFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Exclude soft-deleted items by default
            predicates.add(cb.isNull(root.get("deletedAt")));

            // Filter by brand
            if (filter.getBrandId() != null) {
                predicates.add(cb.equal(root.get("brand").get("id"), filter.getBrandId()));
            }

            // Filter by name
            if (filter.getName() != null) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"));
            }

            // Filter by description
            if (filter.getDescription() != null) {
                predicates.add(cb.like(cb.lower(root.get("description")),
                        "%" + filter.getDescription().toLowerCase() + "%"));
            }

            // Filter by topNotes
            if (filter.getTopNotes() != null) {
                predicates.add(cb.like(cb.lower(root.get("topNotes")),
                        "%" + filter.getTopNotes().toLowerCase() + "%"));
            }

            // Filter by middleNotes
            if (filter.getMiddleNotes() != null) {
                predicates.add(cb.like(cb.lower(root.get("middleNotes")),
                        "%" + filter.getMiddleNotes().toLowerCase() + "%"));
            }

            // Filter by baseNotes
            if (filter.getBaseNotes() != null) {
                predicates.add(cb.like(cb.lower(root.get("baseNotes")),
                        "%" + filter.getBaseNotes().toLowerCase() + "%"));
            }

            // Filter by decantPrice
            if (filter.getDecantPrice() != null) {
                predicates.add(cb.equal(root.get("decantPrice"), filter.getDecantPrice()));
            }

            // Filter by fullBottlePrice
            if (filter.getFullBottlePrice() != null) {
                predicates.add(cb.equal(root.get("fullBottlePrice"), filter.getFullBottlePrice()));
            }

            // Filter by imageUrl
            if (filter.getImageUrl() != null) {
                predicates.add(cb.like(cb.lower(root.get("imageUrl")),
                        "%" + filter.getImageUrl().toLowerCase() + "%"));
            }

            // Filter by stockQuantity
            if (filter.getStockQuantity() != null) {
                predicates.add(cb.equal(root.get("stockQuantity"), filter.getStockQuantity()));
            }

            // Filter by availability
            if (filter.getAvailability() != null) {
                predicates.add(cb.like(cb.lower(root.get("availability")),
                        "%" + filter.getAvailability().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
