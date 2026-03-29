package com.scentcepts.repositories;

import com.scentcepts.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByAvailability(String availability);
    List<Product> findByBrandId(UUID brandId);
}
