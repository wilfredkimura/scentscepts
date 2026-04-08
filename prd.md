SCENTCEPTS PERFUME WEB APPLICATION
Functional Requirements
Functional requirements define the specific features and behaviors the system must support for both the storefront and the administrative backend.

Customer Features
Product Discovery: Display a grid layout of products with images, names, and starting prices. Provide a detailed page for each perfume including scent notes (top, middle, base) and size-based pricing.

Search and Filtering: Allow users to filter products by brand, price range, and availability.

Cart Management: Enable users to add/remove items and update quantities. The system must calculate the dynamic total price in real-time and maintain cart data throughout the user's session.

WhatsApp Checkout: Collect user details including Name, Phone, and Address. The system must generate a formatted order summary and redirect the user to a pre-filled WhatsApp message for order finalization.

Admin Features
Authentication: Provide a secure login system with Role-Based Access Control (RBAC) specifically for the Admin role.

Command Center: Display real-time business metrics including Gross Revenue, Total Orders, and Total Customers.

Order Management: List all orders with customer and product details. Admins must be able to update order statuses (Pending, Processing, Shipped, Delivered).

Inventory Hub: Perform CRUD operations (Create, Read, Update, Delete) on products and brands. This includes setting stock levels, availability statuses, and receiving automatic alerts for low-stock items.

Customer Tracking: Maintain and display a searchable list of customer contact data and addresses.


Non-Functional Requirements
Non-functional requirements define the quality attributes, technical constraints, and performance standards of the application.

1. Usability and Aesthetics
UI/UX Design: The interface must reflect a luxury feel using a specific color palette (black, gold, nude) and elegant typography.

Responsiveness: The application must follow a mobile-first design approach to ensure it works seamlessly on smartphones and tablets.

Interactivity: The site should incorporate smooth animations and transitions to enhance the premium user experience.

2. Security
Access Control: All admin routes and API endpoints must be strictly protected and inaccessible to non-admin users.

Data Integrity: Ensure secure storage of passwords via hashing and protect customer data within the database.

3. Performance and Reliability
Real-time Updates: The admin dashboard must display metrics and stock alerts with minimal latency.

Persistence: The shopping cart must remain persistent for the duration of a user's session to prevent data loss.

4. Technical Constraints
Backend: The system must be developed using Java (Spring Boot) with a REST API architecture.

Frontend: The client-side application must be developed using Next.js.

Database: Use Postgres for relational data storage and management.

