# 🎨 Indian Artisans Marketplace Platform

A comprehensive, production-grade e-commerce platform connecting traditional Indian artisans with global markets. Built with Next.js, PostgreSQL, Razorpay, WhatsApp Cloud API, and **AI-powered product creation**.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.1-green)
![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991)

> **🤖 NEW: AI-Powered Product Creation** - Artisans can now create professional product listings by simply sending a photo and voice message via WhatsApp! GPT-4 Vision + Whisper automatically generate titles, descriptions, pricing, and cultural stories.

---

## 🚀 Features

### 🤖 **AI-Powered Product Creation** ⭐ NEW
- **WhatsApp Integration**: Artisans send photo + voice → AI creates professional listing
- **GPT-4 Vision**: Analyzes product images for visual details
- **Whisper**: Transcribes voice in any language (Hindi, English, regional languages)
- **GPT-4 Turbo**: Generates titles, descriptions, pricing, categories, tags
- **Cultural Storytelling**: AI-generated stories highlighting craft heritage
- **30-second Processing**: From media upload to published product
- **Low Cost**: ~₹3.50 per product (~$0.04)
- 📖 [Full Documentation](AI_PIPELINE.md) | 🧪 [Testing Guide](AI_TESTING.md)

### 🛍️ **Marketplace**
- Product catalog with advanced filtering
- AI-generated product descriptions & stories
- Multi-currency support (40+ currencies)
- Real-time inventory management
- Advanced search with Elasticsearch integration

### 👨‍🎨 **Artisan Features**
- Verified artisan profiles with KYC
- Digital storytelling platform
- Virtual & physical workshops
- Direct customer communication
- Business analytics dashboard

### 💳 **Payments & Orders**
- Razorpay payment gateway integration
- Multiple payment methods (UPI, Cards, NetBanking, Wallets)
- Secure payment processing
- Automated refunds & reconciliation
- Subscription management

### 📱 **WhatsApp Integration**
- **AI Product Creation** (photo + voice → listing)
- Order confirmations via WhatsApp
- Shipment tracking updates
- Customer support messaging
- Promotional campaigns
- Automated notifications

### 🔐 **Security & Compliance**
- Multi-factor authentication (MFA)
- Data encryption (AES-256)
- GDPR & data privacy compliance
- Role-based access control (RBAC)
- Fraud detection system
- Audit logging

### 📊 **Analytics & Insights**
- Real-time dashboard
- Customer segmentation
- Predictive analytics
- Sales forecasting
- Business intelligence reports
- Marketing attribution

### 🌍 **Global Marketplace**
- Multi-language support (12+ languages)
- Regional adaptation
- International shipping calculator
- Currency conversion
- Localized payment methods

### 🎯 **Advanced Features**
- AR/VR product visualization
- AI-powered personalization
- Social commerce integration
- Loyalty & rewards program
- Gamification elements
- Community forums

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Razorpay account
- WhatsApp Business account

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

Visit http://localhost:3000

📖 **Detailed Setup**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js

### Integrations
- **AI**: OpenAI (GPT-4 Vision, Whisper, GPT-4 Turbo)
- **Payments**: Razorpay
- **Messaging**: WhatsApp Cloud API (Meta)
- **HTTP Client**: Axios
- **Password Hashing**: bcrypt

### DevOps
- **Hosting**: Vercel (recommended)
- **Database**: Supabase / Neon / Railway
- **Version Control**: Git
- **Package Manager**: npm

---

## 📁 Project Structure

```
indian_artisans/
├── app/                      # Next.js app directory
│   ├── (routes)/            # Application pages
│   ├── api/                 # API routes
│   │   ├── orders/         # Order management
│   │   ├── payment/        # Payment processing
│   │   ├── products/       # Product CRUD
│   │   ├── users/          # User management
│   │   ├── artisans/       # Artisan profiles
│   │   └── webhooks/       # External webhooks
│   ├── admin/              # Admin dashboard
│   └── features/           # Features showcase
├── components/              # React components
│   ├── ui/                 # UI primitives
│   ├── dashboard/          # Dashboard components
│   └── ...                 # Feature components
├── lib/                     # Utility libraries
│   ├── services/           # External services
│   │   ├── whatsapp.ts    # WhatsApp integration
│   │   └── razorpay.ts    # Razorpay integration
│   ├── prisma.ts           # Prisma client
│   └── [40+ systems]       # Backend systems
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
├── public/                  # Static assets
├── .env                     # Environment variables
└── SETUP_GUIDE.md          # Setup instructions
```

---

## 🗄️ Database Schema

**25+ Models** covering:

- User & Authentication
- Artisan Profiles
- Products & Inventory
- Orders & Fulfillment
- Payments & Refunds
- Reviews & Ratings
- Cart & Wishlist
- Stories & Workshops
- WhatsApp Messages
- Analytics & Tracking
- Notifications
- Subscriptions
- Loyalty Points

**View Schema**:
```bash
npx prisma studio
```

---

## 🔌 API Endpoints

### AI Product Creation ⭐ NEW
```
POST /api/ai/products           # AI product creation
GET  /api/ai/products           # Quick image analysis
```

### Products
```
GET  /api/products              # List products
GET  /api/products?id={id}      # Get product
POST /api/products              # Create product
```

### Orders
```
POST /api/orders                # Create order
GET  /api/orders?userId={id}    # User orders
GET  /api/orders?orderId={id}   # Order details
```

### Payments
```
POST /api/payment/verify        # Verify payment
```

### Webhooks
```
POST /api/webhooks/razorpay     # Razorpay events
POST /api/webhooks/whatsapp     # WhatsApp messages (+ AI processing)
```

---

## 🎯 Key Features Implemented

### ✅ Phase 1-4 (Foundation)
- User authentication & authorization
- Product catalog & search
- Shopping cart & checkout
- Payment integration
- Order management

### ✅ Phase 5-7 (Enhanced Experience)
- Voice commerce
- Cultural storytelling
- Workshop management
- Multi-currency payments
- International shipping

### ✅ Phase 8-12 (Advanced)
- Mobile app backend
- Admin dashboard (40 systems)
- Security & compliance
- Performance optimization
- Third-party integrations

**Total**: 40 Backend Systems across 12 phases

📄 **Full Documentation**: [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)

---

## 🔧 Development Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run db:generate           # Generate Prisma client
npm run db:migrate            # Run migrations
npm run db:studio             # Open Prisma Studio
npm run db:seed               # Seed database
npm run db:reset              # Reset database

# Production
npm run build                 # Build for production
npm run start                 # Start production server
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

**Database**: Use Supabase, Neon, or Railway for PostgreSQL

📖 **Deployment Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md#deployment)

---

## 🔐 Environment Variables

Required variables:

```env
DATABASE_URL                    # PostgreSQL connection
OPENAI_API_KEY                 # OpenAI API key (for AI features)
RAZORPAY_KEY_ID                # Razorpay test/live key
RAZORPAY_KEY_SECRET            # Razorpay secret
WHATSAPP_PHONE_NUMBER_ID       # WhatsApp phone ID
WHATSAPP_ACCESS_TOKEN          # WhatsApp access token
WHATSAPP_BUSINESS_ACCOUNT_ID   # Business account ID
WHATSAPP_WEBHOOK_VERIFY_TOKEN  # Custom verify token
NEXTAUTH_SECRET                # Auth secret
NEXTAUTH_URL                   # App URL
```

**Get API Keys**:
- OpenAI: https://platform.openai.com/api-keys
- Razorpay: https://dashboard.razorpay.com
- WhatsApp: https://developers.facebook.com/apps

---

## 📊 Admin Dashboard

Access: http://localhost:3000/admin

**Features**:
- 40 system overview
- Real-time statistics
- User management
- Order tracking
- Payment monitoring
- Analytics dashboard
- Content moderation
- System health

---

## 🧪 Testing

### Test AI Product Creation
```bash
# 1. Configure OpenAI API key in .env
# 2. Follow testing guide
```
📖 **Full Testing Guide**: [AI_TESTING.md](AI_TESTING.md)

### Test Payment
1. Use Razorpay test mode
2. Test card: `4111 1111 1111 1111`
3. Any CVV, future expiry

### Test WhatsApp
1. Add test number in Meta dashboard
2. Trigger order notification
3. Verify message delivery

---

## 📈 Performance

- **Server-Side Rendering**: Optimized page loads
- **Image Optimization**: Next.js Image component
- **Database**: Connection pooling with Prisma
- **Caching**: API response caching
- **CDN**: Static assets via Vercel Edge Network

---

## 🤝 Contributing

This is a proprietary platform. For collaboration inquiries, please contact the project owner.

---

## 📄 License

Proprietary - Indian Artisans Marketplace Platform

---

## 🆘 Support

- **AI Pipeline**: [AI_PIPELINE.md](./AI_PIPELINE.md)
- **AI Testing**: [AI_TESTING.md](./AI_TESTING.md)
- **Setup Issues**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **System Documentation**: [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)
- **Prisma Docs**: https://www.prisma.io/docs
- **Razorpay Docs**: https://razorpay.com/docs
- **WhatsApp API**: https://developers.facebook.com/docs/whatsapp
- **OpenAI API**: https://platform.openai.com/docs

---

## 🎉 Key Highlights

- ✅ **40 Backend Systems** fully integrated
- ✅ **PostgreSQL Database** with Prisma ORM
- ✅ **Razorpay Payments** with webhook support
- ✅ **WhatsApp Cloud API** for notifications
- ✅ **Production-Ready** architecture
- ✅ **Type-Safe** with TypeScript
- ✅ **Scalable** database design
- ✅ **Secure** authentication & authorization
- ✅ **Comprehensive API** endpoints
- ✅ **Admin Dashboard** for all systems

---

Built with ❤️ for Indian Artisans
