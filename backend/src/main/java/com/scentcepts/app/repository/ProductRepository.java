package com.scentcepts.app.repository;

import java.util.UUID;

import com.scentcepts.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>,
        JpaSpecificationExecutor<Product> {
    
    List<Product> findByDeletedAtIsNotNull();
    
    Optional<Product> findByIdAndDeletedAtIsNotNull(UUID id);
}
