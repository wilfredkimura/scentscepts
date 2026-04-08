package com.scentcepts.app.controller;

import java.util.UUID;

import com.scentcepts.app.entity.Role;
import com.scentcepts.app.entity.User;
import com.scentcepts.app.entity.Product;
import com.scentcepts.app.repository.UserRepository;
import com.scentcepts.app.repository.ProductRepository;
import com.scentcepts.app.repository.ScentOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ScentOrderRepository orderRepository;

    /** GET /api/v1/admin/users — list all users */
    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    /** GET /api/v1/admin/users/{id} — get single user */
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** PUT /api/v1/admin/users/{id}/role — assign role */
    @PutMapping("/users/{id}/role")
    public ResponseEntity<Map<String, String>> assignRole(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {

        String roleName = body.get("role");
        Role role;
        try {
            role = Role.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid role: " + roleName + ". Use ROLE_USER or ROLE_ADMIN"));
        }

        return userRepository.findById(id).map(user -> {
            user.setRoles(new HashSet<>(Set.of(role)));
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Role updated to " + roleName));
        }).orElse(ResponseEntity.notFound().build());
    }

    /** DELETE /api/v1/admin/users/{id} — delete user */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable UUID id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted"));
    }

    /** GET /api/v1/admin/stats — business metrics dashboard */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> stats() {
        return ResponseEntity.ok(Map.of(
                "totalUsers", userRepository.count(),
                "totalProducts", productRepository.count(),
                "totalOrders", orderRepository.count(),
                "activeCustomers", userRepository.count() // Simple placeholder logic
        ));
    }

    /** GET /api/v1/admin/trash/products — list soft-deleted products */
    @GetMapping("/trash/products")
    public ResponseEntity<List<Product>> listTrashProducts() {
        return ResponseEntity.ok(productRepository.findByDeletedAtIsNotNull());
    }

    /** POST /api/v1/admin/trash/products/{id}/restore — restore soft-deleted product */
    @PostMapping("/trash/products/{id}/restore")
    public ResponseEntity<Map<String, String>> restoreProduct(@PathVariable UUID id) {
        return productRepository.findByIdAndDeletedAtIsNotNull(id).map(product -> {
            product.setDeletedAt(null);
            productRepository.save(product);
            return ResponseEntity.ok(Map.of("message", "Product '" + product.getName() + "' restored"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
