package com.scentcepts.app.repository;

import com.scentcepts.app.dto.OrderItemFilter;
import com.scentcepts.app.entity.OrderItem;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * JPA Specification builder for {@link OrderItem}.
 * Uses a single {@code build(filter)} method so the predicate list never explodes.
 * Add a null-check for each field — if the filter field is null it is ignored.
 */
public class OrderItemSpecification {

    private OrderItemSpecification() {}

    public static Specification<OrderItem> build(OrderItemFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter by size
            if (filter.getSize() != null) {
                predicates.add(cb.like(cb.lower(root.get("size")),
                        "%" + filter.getSize().toLowerCase() + "%"));
            }

            // Filter by quantity
            if (filter.getQuantity() != null) {
                predicates.add(cb.equal(root.get("quantity"), filter.getQuantity()));
            }

            // Filter by priceAtPurchase
            if (filter.getPriceAtPurchase() != null) {
                predicates.add(cb.equal(root.get("priceAtPurchase"), filter.getPriceAtPurchase()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
