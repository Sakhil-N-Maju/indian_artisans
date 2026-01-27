# 🚀 Quick Reference Card

## Essential Commands

```bash
# Development
npm run dev                 # Start development server (http://localhost:3000)
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run db:generate        # Generate Prisma client (run after schema changes)
npm run db:migrate         # Create and apply migration
npm run db:studio          # Open Prisma Studio (database GUI)
npm run db:push            # Push schema without migration
npm run db:reset           # Reset database (WARNING: deletes all data)

# Installation
npm install --legacy-peer-deps    # Install dependencies
```

---

## Key URLs

| Service                | URL                                               |
| ---------------------- | ------------------------------------------------- |
| **Local App**          | http://localhost:3000                             |
| **Admin Dashboard**    | http://localhost:3000/admin                       |
| **Features Page**      | http://localhost:3000/features                    |
| **Prisma Studio**      | http://localhost:5555 (after `npm run db:studio`) |
| **Razorpay Dashboard** | https://dashboard.razorpay.com                    |
| **Meta Developers**    | https://developers.facebook.com                   |
| **Supabase**           | https://supabase.com                              |

---

## API Endpoints

```bash
# Products
GET  /api/products                # List all products
GET  /api/products?id={id}        # Get product by ID
POST /api/products                # Create product

# Orders
POST /api/orders                  # Create order
GET  /api/orders?userId={id}      # Get user orders
GET  /api/orders?orderId={id}     # Get order details

# Users
POST /api/users                   # Register user
GET  /api/users?id={id}           # Get user by ID
GET  /api/users?phone={phone}     # Get user by phone

# Artisans
GET  /api/artisans                # List artisans
GET  /api/artisans?id={id}        # Get artisan details
POST /api/artisans                # Create artisan profile

# Payments
POST /api/payment/verify          # Verify Razorpay payment

# Webhooks
POST /api/webhooks/razorpay       # Razorpay webhook
POST /api/webhooks/whatsapp       # WhatsApp webhook
GET  /api/webhooks/whatsapp       # WhatsApp webhook verification
```

---

## Environment Variables

```env
# Database (Required)
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Razorpay (Required)
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your_secret"

# WhatsApp (Required)
WHATSAPP_PHONE_NUMBER_ID="your_phone_id"
WHATSAPP_ACCESS_TOKEN="your_token"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_id"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="random_string"

# Next.js (Required)
NEXTAUTH_SECRET="random_32_byte_string"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Test Credentials

### Razorpay Test Cards

```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

### Generate Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Database Schema Quick View

```bash
# View all models
npx prisma studio

# Generate ERD
npx prisma generate
```

### Main Models

- `User` - Customer/Artisan/Admin accounts
- `Artisan` - Artisan profiles
- `Product` - Products with images
- `Order` - Orders with items
- `Payment` - Payment records
- `WhatsAppMessage` - Message logs
- `Review` - Product reviews
- `CartItem` - Shopping cart
- `WishlistItem` - Wishlist

---

## Common Tasks

### Add New Product

```typescript
POST /api/products
{
  "artisanId": "xxx",
  "title": "Handwoven Saree",
  "description": "Beautiful handwoven silk saree",
  "price": 5000,
  "category": "Textiles",
  "stock": 10,
  "images": [
    { "url": "https://...", "altText": "Saree" }
  ]
}
```

### Create Order

```typescript
POST /api/orders
{
  "userId": "xxx",
  "items": [
    { "productId": "xxx", "quantity": 1 }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "+919876543210",
    "line1": "123 Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

### Send WhatsApp Message

```typescript
import { whatsappService } from '@/lib/services/whatsapp';

await whatsappService.sendTextMessage('+919876543210', 'Your order is confirmed!', userId);
```

---

## Troubleshooting

### Can't connect to database

```bash
# Check DATABASE_URL
# Ensure PostgreSQL is running
npx prisma studio  # Test connection
```

### Prisma client not found

```bash
npm run db:generate
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Payment verification fails

- Check Razorpay API keys (test vs live)
- Verify signature calculation
- Check server logs

---

## Project Structure

```
indian_artisans/
├── app/                    # Next.js pages & API routes
│   ├── api/               # API endpoints
│   ├── admin/             # Admin dashboard
│   └── ...                # Other pages
├── components/            # React components
├── lib/                   # Business logic & services
│   ├── services/         # External services
│   │   ├── razorpay.ts  # Payment service
│   │   └── whatsapp.ts  # Messaging service
│   └── prisma.ts         # Database client
├── prisma/               # Database
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration history
├── .env                  # Environment variables
└── package.json          # Dependencies
```

---

## Documentation Files

| File                       | Purpose            |
| -------------------------- | ------------------ |
| `README.md`                | Project overview   |
| `SETUP_GUIDE.md`           | Step-by-step setup |
| `ARCHITECTURE.md`          | Technical details  |
| `IMPLEMENTATION_STATUS.md` | All 40 systems     |
| `ENHANCEMENT_SUMMARY.md`   | Recent changes     |
| `STATUS.md`                | Current status     |
| `.env.example`             | Config template    |

---

## Key Features

✅ 40 Backend Systems  
✅ PostgreSQL + Prisma ORM  
✅ Razorpay Payments  
✅ WhatsApp Notifications  
✅ Admin Dashboard  
✅ RESTful APIs  
✅ Type-Safe with TypeScript  
✅ Production Ready

---

## Quick Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 2. Connect to Vercel
# Visit: https://vercel.com
# Import repository
# Add environment variables
# Deploy

# 3. Configure webhooks
# Razorpay: https://yourdomain.vercel.app/api/webhooks/razorpay
# WhatsApp: https://yourdomain.vercel.app/api/webhooks/whatsapp
```

---

## Support

📚 **Docs**: See documentation files  
🔗 **Prisma**: https://prisma.io/docs  
💳 **Razorpay**: https://razorpay.com/docs  
📱 **WhatsApp**: https://developers.facebook.com/docs/whatsapp

---

**Version**: 2.0  
**Status**: Production Ready ✅
