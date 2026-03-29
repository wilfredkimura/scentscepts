package com.scentcepts.config;

import com.scentcepts.models.Brand;
import com.scentcepts.models.Product;
import com.scentcepts.repositories.BrandRepository;
import com.scentcepts.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    
    public DataSeeder(BrandRepository brandRepository, ProductRepository productRepository) {
        this.brandRepository = brandRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (brandRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        Brand exclusive = createBrand("Scentcepts Exclusive");
        Brand maison = createBrand("Maison");
        Brand aqua = createBrand("Aqua");

        ZonedDateTime now = ZonedDateTime.now();

        createProduct(exclusive, "Midnight Oud", 
            "An exquisitely opulent fragrance with dark rose and smoky oud.",
            "Dark Rose, Pink Pepper", "Rich Vanilla, Amber", "Smoky Agarwood (Oud), Patchouli",
            "15.00", "150.00",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
            45, "AVAILABLE", now);

        createProduct(maison, "Velvet Rose", 
            "A delicate yet powerful floral scent with a velvety finish.",
            "Bergamot, Peony", "Damask Rose, Magnolia", "White Musk, Amber",
            "12.50", "120.00",
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
            12, "AVAILABLE", now);

        createProduct(aqua, "Oceanic Citrus", 
            "Refreshing blend of citrus and marine notes.",
            "Lime, Sea Salt", "Nerolli, Rosemary", "Driftwood, Cedar",
            "10.00", "95.00",
            "https://images.unsplash.com/photo-1547671722-12c37b1f1936?auto=format&fit=crop&q=80&w=800",
            0, "SOLD_OUT", now);
    }

    private Brand createBrand(String name) {
        Brand brand = new Brand();
        brand.setName(name);
        return brandRepository.save(brand);
    }

    private void createProduct(Brand brand, String name, String desc, String top, String mid, String base, 
                             String dPrice, String fPrice, String img, int stock, String status, ZonedDateTime now) {
        Product p = new Product();
        p.setBrand(brand);
        p.setName(name);
        p.setDescription(desc);
        p.setTopNotes(top);
        p.setMiddleNotes(mid);
        p.setBaseNotes(base);
        p.setDecantPrice(new BigDecimal(dPrice));
        p.setFullBottlePrice(new BigDecimal(fPrice));
        p.setImageUrl(img);
        p.setStockQuantity(stock);
        p.setAvailability(status);
        p.setCreatedAt(now);
        p.setUpdatedAt(now);
        productRepository.save(p);
    }
}
