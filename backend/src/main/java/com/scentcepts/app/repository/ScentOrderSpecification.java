package com.scentcepts.app.repository;

import com.scentcepts.app.dto.ScentOrderFilter;
import com.scentcepts.app.entity.ScentOrder;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * JPA Specification builder for {@link ScentOrder}.
 * Uses a single {@code build(filter)} method so the predicate list never explodes.
 * Add a null-check for each field — if the filter field is null it is ignored.
 */
public class ScentOrderSpecification {

    private ScentOrderSpecification() {}

    public static Specification<ScentOrder> build(ScentOrderFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter by totalAmount
            if (filter.getTotalAmount() != null) {
                predicates.add(cb.equal(root.get("totalAmount"), filter.getTotalAmount()));
            }

            // Filter by status
            if (filter.getStatus() != null) {
                predicates.add(cb.like(cb.lower(root.get("status")),
                        "%" + filter.getStatus().toLowerCase() + "%"));
            }

            // Filter by deliveryAddress
            if (filter.getDeliveryAddress() != null) {
                predicates.add(cb.like(cb.lower(root.get("deliveryAddress")),
                        "%" + filter.getDeliveryAddress().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
