package com.scentcepts.controllers;

import com.scentcepts.services.OrderService;
import com.scentcepts.repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/admin/stats")
public class StatsController {
    
    private final OrderService orderService;
    private final UserRepository userRepository;
    
    public StatsController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }
    
    @GetMapping
    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalRevenue(orderService.getTotalRevenue());
        stats.setTotalOrders(orderService.getOrderCount());
        stats.setTotalCustomers(userRepository.count());
        return stats;
    }
    
    public static class DashboardStats {
        private BigDecimal totalRevenue;
        private long totalOrders;
        private long totalCustomers;
        
        public DashboardStats() {}
        
        public BigDecimal getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
        public long getTotalOrders() { return totalOrders; }
        public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
        public long getTotalCustomers() { return totalCustomers; }
        public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }
    }
}
