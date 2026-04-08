package com.scentcepts.app.repository;

import java.util.UUID;

import com.scentcepts.app.entity.ScentOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ScentOrderRepository extends JpaRepository<ScentOrder, UUID>,
        JpaSpecificationExecutor<ScentOrder> {
}
