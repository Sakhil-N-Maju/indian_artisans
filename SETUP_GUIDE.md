# Indian Artisans Marketplace - Setup Guide

## Architecture Overview

This platform uses a modern, production-grade tech stack:

- **Frontend**: Next.js 16 with React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Razorpay Payment Gateway
- **Messaging**: WhatsApp Cloud API (Meta)
- **40+ Backend Systems** spanning 12 phases of development

---

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v14 or higher)
3. **Razorpay Account** - [Sign up](https://dashboard.razorpay.com/signup)
4. **WhatsApp Business Account** - [Meta for Developers](https://developers.facebook.com/)

---

## Installation Steps

### 1. Clone and Install Dependencies

```bash
cd indian_artisans
npm install --legacy-peer-deps
```

### 2. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Start PostgreSQL service
# Windows: Services → PostgreSQL
# Mac/Linux: brew services start postgresql

# Create database
psql -U postgres
CREATE DATABASE indian_artisans;
\q
```

#### Option B: Cloud PostgreSQL (Recommended for production)
- **Supabase**: https://supabase.com/ (Free tier available)
- **Neon**: https://neon.tech/ (Free tier available)
- **Railway**: https://railway.app/ (Free tier available)

### 3. Configure Environment Variables

Update `.env` file with your credentials:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/indian_artisans?schema=public"

# Razorpay Credentials (from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_secret_key_here"

# WhatsApp Cloud API (from https://developers.facebook.com/apps)
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
WHATSAPP_ACCESS_TOKEN="your_permanent_access_token"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="any_random_string_you_choose"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Session
NEXTAUTH_SECRET="generate_a_random_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate a random secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Seed sample data
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Razorpay Setup

### 1. Create Razorpay Account
1. Go to https://dashboard.razorpay.com/signup
2. Complete KYC verification
3. Get API keys from Dashboard → Settings → API Keys

### 2. Test Mode
- Use test keys (starts with `rzp_test_`) for development
- Test card: 4111 1111 1111 1111, Any CVV, Future expiry

### 3. Webhook Configuration
1. Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: payment.authorized, payment.captured, payment.failed, refund.*
4. Copy webhook secret

---

## WhatsApp Cloud API Setup

### 1. Create Meta App
1. Go to https://developers.facebook.com/apps
2. Create new app → Business type
3. Add WhatsApp product

### 2. Configure WhatsApp
1. Get test phone number or add your own
2. Copy Phone Number ID
3. Generate permanent access token (Settings → System Users)
4. Add test recipient numbers

### 3. Webhook Configuration
1. WhatsApp → Configuration → Webhook
2. Callback URL: `https://yourdomain.com/api/webhooks/whatsapp`
3. Verify token: (use same as in .env)
4. Subscribe to messages and messages_status

---

## Database Schema

The platform includes comprehensive models for:

### Core Entities
- **User** - Customer/Artisan/Admin accounts
- **Artisan** - Artisan profiles with KYC
- **Product** - Handcrafted products with images
- **Order** - Order management
- **Payment** - Payment tracking via Razorpay

### Features
- **Reviews & Ratings** - Product reviews
- **Cart & Wishlist** - Shopping features
- **Stories** - Artisan storytelling
- **Workshops** - Virtual/physical workshops
- **WhatsApp Messages** - Communication logs
- **Analytics** - Event tracking
- **Notifications** - Multi-channel alerts
- **Subscriptions** - Recurring payments
- **Loyalty Points** - Gamification

### View Schema
```bash
npx prisma studio
```
Opens visual database browser at http://localhost:5555

---

## API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products?id={id}` - Get product details
- `POST /api/products` - Create product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders?userId={id}` - Get user orders
- `GET /api/orders?orderId={id}` - Get order details

### Payments
- `POST /api/payment/verify` - Verify Razorpay payment

### Users
- `POST /api/users` - Register user
- `GET /api/users?id={id}` - Get user details

### Artisans
- `GET /api/artisans` - List artisans
- `POST /api/artisans` - Create artisan profile

### Webhooks
- `POST /api/webhooks/razorpay` - Razorpay webhook
- `GET/POST /api/webhooks/whatsapp` - WhatsApp webhook

---

## Services

### WhatsApp Service
```typescript
import { whatsappService } from '@/lib/services/whatsapp';

// Send text message
await whatsappService.sendTextMessage(phone, message, userId);

// Send order confirmation
await whatsappService.sendOrderConfirmation(phone, orderId, userId);

// Send shipment update
await whatsappService.sendShipmentUpdate(phone, orderId, trackingNumber, carrier, userId);
```

### Razorpay Service
```typescript
import { razorpayService } from '@/lib/services/razorpay';

// Create order
const result = await razorpayService.createOrder(amount, 'INR', receipt);

// Process payment
await razorpayService.processPayment(orderId, razorpayOrderId, paymentId, signature);

// Create refund
await razorpayService.processRefund(orderId, amount, reason);
```

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
- Visit https://vercel.com
- Import GitHub repository
- Add environment variables
- Deploy

3. **Configure Database**
- Use Supabase/Neon for PostgreSQL
- Update DATABASE_URL in Vercel environment variables
- Run migrations: `npx prisma migrate deploy`

### Environment Variables in Vercel
Add all variables from `.env` to Vercel project settings:
- Settings → Environment Variables
- Add each variable (DATABASE_URL, RAZORPAY_KEY_ID, etc.)

---

## Testing

### Test Payment Flow
1. Add products to cart
2. Checkout
3. Use test card: 4111 1111 1111 1111
4. Verify payment in Razorpay dashboard

### Test WhatsApp
1. Add test phone number in Meta dashboard
2. Trigger order confirmation
3. Check WhatsApp messages

---

## Admin Dashboard

Access at: http://localhost:3000/admin

Features:
- 40 system overview
- Real-time statistics
- User management
- Order tracking
- Payment monitoring
- Analytics dashboard
- Content moderation
- System health

---

## Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

---

## Troubleshooting

### Prisma Client Issues
```bash
npx prisma generate
```

### Database Connection Error
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

### Razorpay Payment Failed
- Verify API keys (test/live mode)
- Check webhook URL is accessible
- Review Razorpay dashboard logs

### WhatsApp Not Sending
- Verify access token hasn't expired
- Check phone number is verified
- Review Meta app status
- Test with Postman first

---

## Support

- **Documentation**: See `IMPLEMENTATION_STATUS.md` for all 40 systems
- **Prisma Docs**: https://www.prisma.io/docs
- **Razorpay Docs**: https://razorpay.com/docs
- **WhatsApp API Docs**: https://developers.facebook.com/docs/whatsapp

---

## License

Proprietary - Indian Artisans Marketplace Platform
