# Indian Artisans Marketplace - Architecture Documentation

## System Architecture Overview

This document provides a comprehensive overview of the platform's architecture, technologies, and design decisions.

---

## 1. Architecture Pattern

### **Monolithic Architecture with Microservices Integration**

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  (Next.js App Router, React Components, Tailwind CSS)       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Next.js)                       │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Products │  Orders  │ Payments │  Users   │ Webhooks │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  40 Backend Systems (lib/ directory)                  │  │
│  │  • Authentication    • Payment Processing             │  │
│  │  • Product Catalog   • Order Management              │  │
│  │  • Search & Filter   • Analytics & Reporting         │  │
│  │  • WhatsApp Service  • Razorpay Service              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (Prisma ORM)                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database (Primary Store)             │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Razorpay API  │  │ WhatsApp Cloud │  │ Other Services  │
│  (Payments)     │  │  API (Meta)    │  │  (Future)       │
└────────────────┘  └────────────────┘  └────────────────┘
```

---

## 2. Technology Stack

### **Frontend**

| Technology   | Version | Purpose                      |
| ------------ | ------- | ---------------------------- |
| Next.js      | 16.0.7  | React framework with SSR/SSG |
| React        | 19.0.0+ | UI library                   |
| TypeScript   | 5.0+    | Type safety                  |
| Tailwind CSS | 3.4+    | Utility-first CSS            |
| Radix UI     | Latest  | Accessible UI primitives     |
| shadcn/ui    | Latest  | Pre-built components         |

### **Backend**

| Technology         | Version | Purpose                |
| ------------------ | ------- | ---------------------- |
| Node.js            | 18+     | Runtime environment    |
| Next.js API Routes | 16.0.7  | RESTful API endpoints  |
| Prisma             | 7.1.0   | ORM & database toolkit |
| PostgreSQL         | 14+     | Primary database       |

### **Integrations**

| Service            | Purpose                |
| ------------------ | ---------------------- |
| Razorpay           | Payment gateway        |
| WhatsApp Cloud API | Customer communication |
| Axios              | HTTP client            |
| bcrypt             | Password hashing       |

### **DevOps**

| Tool          | Purpose              |
| ------------- | -------------------- |
| Vercel        | Hosting & deployment |
| Git           | Version control      |
| npm           | Package management   |
| Prisma Studio | Database GUI         |

---

## 3. Database Architecture

### **Schema Design Principles**

- **Normalized**: 3NF for data integrity
- **Relational**: Strong foreign key relationships
- **Scalable**: Indexed for performance
- **Auditable**: Timestamps on all tables

### **Core Entities**

```
┌─────────────────────────────────────────────────────────────┐
│                     User Management                          │
│  User → Artisan → Product → Order → Payment                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  E-commerce Entities                         │
│  Product → ProductImage                                      │
│  Order → OrderItem → Product                                 │
│  Cart → CartItem → Product                                   │
│  Wishlist → WishlistItem → Product                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Payment & Finance                          │
│  Order → Payment (Razorpay)                                  │
│  Order → Refund                                              │
│  User → Subscription                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                Content & Engagement                          │
│  Product → Review                                            │
│  Artisan → Story                                             │
│  Artisan → Workshop → WorkshopEnrollment                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Communication & Analytics                       │
│  WhatsAppMessage (Messaging logs)                            │
│  Notification (Multi-channel)                                │
│  Analytics (Event tracking)                                  │
│  LoyaltyPoint (Gamification)                                 │
└─────────────────────────────────────────────────────────────┘
```

### **Indexing Strategy**

- Primary keys: All tables (auto-indexed)
- Foreign keys: All relations
- Status fields: Order.status, Product.status
- Search fields: Product.title, User.phone
- Timestamps: createdAt for analytics

---

## 4. API Design

### **RESTful Conventions**

```
Resource-based URLs:
GET    /api/products          # List
GET    /api/products?id={id}  # Read
POST   /api/products          # Create
PUT    /api/products          # Update
DELETE /api/products          # Delete
```

### **Response Format**

**Success Response**:

```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

**Error Response**:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### **Authentication**

- NextAuth.js for session management
- JWT tokens for API authentication
- Role-based access control (RBAC)

---

## 5. Payment Flow

### **Razorpay Integration**

```
1. Client → Create Order
   ↓
2. Server → POST /api/orders
   • Validate cart
   • Calculate totals
   • Create Razorpay order
   • Save order in DB
   ↓
3. Server → Return order details + Razorpay key
   ↓
4. Client → Show Razorpay checkout
   ↓
5. User → Complete payment
   ↓
6. Razorpay → Return payment details
   ↓
7. Client → POST /api/payment/verify
   • Verify signature
   • Update order status
   • Send WhatsApp confirmation
   ↓
8. Razorpay → Webhook notification
   • Confirm payment captured
   • Update payment status
```

### **Security Measures**

- Signature verification for all payments
- Server-side validation
- Encrypted communication (HTTPS)
- PCI DSS compliance via Razorpay
- No card data stored locally

---

## 6. WhatsApp Integration

### **Message Flow**

```
1. Event Trigger (Order confirmed, shipped, etc.)
   ↓
2. Server → whatsappService.sendMessage()
   ↓
3. WhatsApp Cloud API → Send message
   ↓
4. Server → Store message in DB
   ↓
5. WhatsApp → Webhook notification (status update)
   ↓
6. Server → POST /api/webhooks/whatsapp
   ↓
7. Server → Update message status in DB
```

### **Message Types**

- **Text Messages**: Simple notifications
- **Template Messages**: Pre-approved templates
- **Rich Messages**: Images, documents, buttons

### **Use Cases**

- Order confirmations
- Shipment tracking
- Delivery notifications
- Workshop reminders
- Promotional messages
- Customer support

---

## 7. Service Layer Architecture

### **WhatsApp Service** (`lib/services/whatsapp.ts`)

```typescript
class WhatsAppService {
  sendTextMessage();
  sendTemplateMessage();
  sendOrderConfirmation();
  sendShipmentUpdate();
  handleWebhook();
  verifyWebhook();
}
```

### **Razorpay Service** (`lib/services/razorpay.ts`)

```typescript
class RazorpayService {
  createOrder();
  processPayment();
  verifyPaymentSignature();
  createRefund();
  processRefund();
  verifyWebhookSignature();
}
```

### **Prisma Client** (`lib/prisma.ts`)

- Singleton pattern
- Connection pooling
- Development logging
- Production optimization

---

## 8. Security Architecture

### **Authentication & Authorization**

- Multi-factor authentication (MFA)
- Role-based access control (RBAC)
- JWT session tokens
- Password hashing (bcrypt)

### **Data Protection**

- HTTPS/TLS encryption in transit
- Database encryption at rest
- Environment variable secrets
- API key rotation

### **Compliance**

- GDPR data privacy
- PCI DSS (via Razorpay)
- SOC 2 compliance readiness
- Audit logging

### **Threat Prevention**

- SQL injection prevention (Prisma)
- XSS protection (React)
- CSRF tokens
- Rate limiting
- Input validation

---

## 9. Performance Optimization

### **Frontend**

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading

### **Backend**

- Database connection pooling
- Query optimization
- Caching strategies
- Prisma query batching

### **Database**

- Indexed queries
- Efficient joins
- Pagination
- Read replicas (future)

---

## 10. Scalability Strategy

### **Current (v1.0)**

- Monolithic Next.js app
- Single PostgreSQL database
- Vercel serverless functions

### **Future (v2.0+)**

- Microservices extraction
- Database sharding
- Redis caching layer
- Message queue (RabbitMQ/Kafka)
- CDN for static assets
- Load balancing

---

## 11. Monitoring & Observability

### **Logging**

- Application logs (console)
- Database query logs (Prisma)
- Error tracking (Sentry - future)
- Access logs

### **Metrics**

- API response times
- Database query performance
- Error rates
- Payment success/failure rates

### **Alerts**

- Payment failures
- API downtime
- Database connection issues
- High error rates

---

## 12. Deployment Architecture

### **Development**

```
Local Machine → npm run dev → http://localhost:3000
```

### **Staging**

```
GitHub → Vercel → Preview Deployment
```

### **Production**

```
GitHub (main) → Vercel → Production Deployment
                ↓
         PostgreSQL (Supabase/Neon)
                ↓
         Razorpay + WhatsApp APIs
```

### **CI/CD Pipeline**

1. Code push to GitHub
2. Vercel auto-detects changes
3. Build Next.js app
4. Run Prisma migrations
5. Deploy to edge network
6. Health check

---

## 13. Data Flow Diagrams

### **Order Creation Flow**

```
User → Add to Cart → Checkout → Payment → Order Confirmation → WhatsApp
  ↓         ↓           ↓          ↓            ↓                ↓
Cart DB   Stock     Razorpay   Payment DB   Order DB    WhatsApp API
         Update      Order                  Update        Message
```

### **Product Discovery Flow**

```
User → Browse/Search → Filter → View Product → Add to Cart
  ↓         ↓            ↓           ↓              ↓
Search   Product DB   Cache    Analytics      Cart DB
Query    + Prisma              Tracking
```

---

## 14. Error Handling

### **Strategy**

- Try-catch blocks in all async operations
- Graceful degradation
- User-friendly error messages
- Detailed logging for debugging

### **Error Types**

- **4xx**: Client errors (validation, not found)
- **5xx**: Server errors (database, API)
- **Network**: Third-party API failures

### **Fallbacks**

- Payment failures → Retry mechanism
- WhatsApp failures → Email fallback
- Database errors → Cache responses

---

## 15. Future Enhancements

### **Phase 13: Advanced Features**

- AI chatbot integration
- Voice commerce enhancement
- AR/VR product preview
- Blockchain provenance

### **Phase 14: Analytics**

- Advanced ML models
- Predictive analytics
- Customer lifetime value
- Churn prediction

### **Phase 15: Expansion**

- Mobile apps (React Native)
- Progressive Web App (PWA)
- International markets
- Multi-tenant architecture

---

## 16. Best Practices

### **Code Quality**

- TypeScript for type safety
- ESLint for code linting
- Prettier for formatting
- Component modularity

### **Database**

- Migrations for schema changes
- Seeding for test data
- Backup strategies
- Connection pooling

### **Security**

- Regular dependency updates
- Security audits
- Penetration testing
- Bug bounty program (future)

---

## Conclusion

This architecture provides a **solid foundation** for a production-grade e-commerce platform with:

- ✅ Modern tech stack
- ✅ Scalable design
- ✅ Secure implementation
- ✅ Third-party integrations
- ✅ Comprehensive features

The system is designed to grow from a single-server deployment to a distributed microservices architecture as needed.

---

**Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Indian Artisans Marketplace Team
