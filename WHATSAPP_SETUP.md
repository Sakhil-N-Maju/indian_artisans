# 📱 WhatsApp Cloud API - Complete Setup Guide

## Overview

Your platform already has **production-grade WhatsApp integration** built-in. This guide will help you activate it.

---

## ✅ What's Already Implemented

Unlike the basic setup suggested, you already have:

- ✅ **Full WhatsApp Service** (`lib/services/whatsapp.ts`)
  - Send text messages
  - Send template messages
  - Order confirmations
  - Shipment tracking
  - Delivery notifications
  - Workshop reminders
  - Message status tracking
  - Database logging

- ✅ **Webhook Handlers** (`app/api/webhooks/whatsapp/route.ts`)
  - GET endpoint for verification
  - POST endpoint for incoming messages
  - Automatic message logging
  - Status updates (sent/delivered/read)

- ✅ **Database Integration**
  - `WhatsAppMessage` model in Prisma
  - All messages logged
  - Status tracking
  - User association

---

## 🚀 Step-by-Step Setup

### Step 1: Create Meta App (10 minutes)

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/apps
   - Click "Create App"
   - Select "Business" type
   - Name your app: "Indian Artisans Marketplace"

2. **Add WhatsApp Product**
   - In app dashboard → Add Product → WhatsApp
   - Click "Set Up" on WhatsApp

3. **Get Your Credentials**

   You'll see these values in **WhatsApp → API Setup**:

   ```
   📱 From Number (test): +14155238886 (Meta's test number)
   📱 To Number: Your phone number (click "Manage phone number list")
   📋 Phone Number ID: 123456789012345
   🔑 Temporary Access Token: EAAxxxxxxxxxxxxx
   🏢 WhatsApp Business Account ID: 123456789012345
   ```

4. **Send Test Message**
   - In "API Setup" page, there's a "Send Message" button
   - Click it to send a test to your phone
   - You should receive "Hello World" message
   - This confirms WhatsApp is working!

---

### Step 2: Get Permanent Access Token (10 minutes)

The temporary token expires in 24 hours. Create a permanent one:

1. **Go to Business Settings**
   - In Meta app → Settings → Basic
   - Note your App ID and App Secret

2. **Create System User**
   - Visit: https://business.facebook.com/settings/system-users
   - Click "Add" → Create system user
   - Name: "indian-artisans-api"
   - Role: Admin

3. **Generate Token**
   - Click on the system user
   - Click "Generate Token"
   - Select your app
   - Permissions needed:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
   - Click "Generate Token"
   - **Copy and save this token** - it doesn't expire!

---

### Step 3: Configure Environment Variables (2 minutes)

Update your `.env` file:

```env
# WhatsApp Cloud API Configuration
WHATSAPP_PHONE_NUMBER_ID="123456789012345"
WHATSAPP_ACCESS_TOKEN="EAAxxxxxxxxxxxxx_YOUR_PERMANENT_TOKEN"
WHATSAPP_BUSINESS_ACCOUNT_ID="123456789012345"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="mySecretToken123"  # Any random string
```

**Generate a secure verify token:**

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

**Restart your dev server** after updating `.env`:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

### Step 4: Expose Your Local Server (5 minutes)

WhatsApp needs a public HTTPS URL to send webhooks. Use ngrok:

1. **Install ngrok**
   - Download from: https://ngrok.com/download
   - Or: `npm install -g ngrok`

2. **Start ngrok**

   ```bash
   ngrok http 3000
   ```

3. **Copy the URL**

   ```
   Forwarding: https://abc123.ngrok.io -> http://localhost:3000
   ```

   Copy the `https://abc123.ngrok.io` URL

---

### Step 5: Configure Webhook in Meta (5 minutes)

1. **Go to WhatsApp Configuration**
   - Meta App → WhatsApp → Configuration

2. **Set Webhook URL**
   - Click "Edit" on Webhook
   - Callback URL: `https://abc123.ngrok.io/api/webhooks/whatsapp`
   - Verify Token: `mySecretToken123` (same as in `.env`)
   - Click "Verify and Save"

3. **Subscribe to Events**
   - Check these fields:
     - ✅ `messages`
     - ✅ `message_status`
   - Click "Subscribe"

4. **Test Verification**
   - Meta will send a GET request to your webhook
   - Check your terminal - you should see the verification log
   - If successful, you'll see "Webhook verified" ✅

---

### Step 6: Test the Integration (5 minutes)

#### Test 1: Send Message from Platform

Create a test file `test-whatsapp.ts`:

```typescript
import { whatsappService } from './lib/services/whatsapp';

// Test sending a message
async function test() {
  const result = await whatsappService.sendTextMessage(
    '+919876543210', // Your WhatsApp number (with country code)
    'Hello from Indian Artisans Marketplace! 🎨',
    'test-user-id'
  );

  console.log('Result:', result);
}

test();
```

Run it:

```bash
npx ts-node test-whatsapp.ts
```

You should receive the message on your phone! 📱

#### Test 2: Receive Messages

1. Send a WhatsApp message to the test number
2. Check your terminal - you should see:
   ```
   Incoming WhatsApp payload: {...}
   ```
3. Check database - message should be logged

---

## 🎯 Using WhatsApp in Your App

### Send Order Confirmation

Already integrated! When an order is placed:

```typescript
// In app/api/orders/route.ts (already implemented)
const user = await prisma.user.findUnique({
  where: { id: order.userId },
});

if (user?.phone && user.whatsappOptIn) {
  const { whatsappService } = await import('@/lib/services/whatsapp');
  await whatsappService.sendOrderConfirmation(user.phone, orderId, user.id);
}
```

### Send Custom Messages

```typescript
import { whatsappService } from '@/lib/services/whatsapp';

// Simple text
await whatsappService.sendTextMessage('+919876543210', 'Your product is ready!', userId);

// Order confirmation
await whatsappService.sendOrderConfirmation(phone, orderId, userId);

// Shipment update
await whatsappService.sendShipmentUpdate(phone, orderId, 'TRK123456', 'Blue Dart', userId);

// Delivery confirmation
await whatsappService.sendDeliveryConfirmation(phone, orderNumber, userId);
```

---

## 📊 Track Messages in Database

All messages are automatically logged:

```typescript
// View sent messages
const messages = await prisma.whatsAppMessage.findMany({
  where: {
    direction: 'OUTBOUND',
    userId: 'user-id',
  },
  orderBy: { createdAt: 'desc' },
});

// View received messages
const received = await prisma.whatsAppMessage.findMany({
  where: {
    direction: 'INBOUND',
    phone: '+919876543210',
  },
});

// Check message status
const message = await prisma.whatsAppMessage.findUnique({
  where: { waMessageId: 'msg-id' },
});
console.log(message.status); // SENT, DELIVERED, READ
```

---

## 🔄 Webhook Flow

```
Customer sends WhatsApp message
    ↓
Meta sends POST to /api/webhooks/whatsapp
    ↓
Your webhook handler processes it
    ↓
Message saved to database
    ↓
(Optional) Trigger AI response or create product
    ↓
Send reply via whatsappService
    ↓
Meta sends status update (delivered/read)
    ↓
Database updated with new status
```

---

## 🎨 Template Messages (Advanced)

For promotional messages, create templates in Meta Business Manager:

1. **Create Template**
   - Meta Business Manager → WhatsApp Manager
   - Message Templates → Create Template
   - Example: "order_confirmed"

   ```
   Hi {{1}}, your order #{{2}} for ₹{{3}} is confirmed! 🎉
   ```

2. **Use Template**
   ```typescript
   await whatsappService.sendTemplateMessage(
     '+919876543210',
     'order_confirmed',
     'en',
     [
       { type: 'text', text: 'John' },
       { type: 'text', text: 'ORD123' },
       { type: 'text', text: '5000' },
     ],
     userId
   );
   ```

---

## 🔍 Debugging

### Check Webhook Logs

```bash
# In your terminal running ngrok
# You'll see all webhook requests
```

### Check Meta Webhook Logs

- Meta App → WhatsApp → Configuration
- Scroll to "Webhooks" section
- Click "View webhook logs"
- See all webhook attempts

### Check Database

```bash
npm run db:studio
# Open WhatsAppMessage table
# See all sent/received messages
```

### Common Issues

**Webhook not verifying?**

- Check `WHATSAPP_WEBHOOK_VERIFY_TOKEN` matches in .env and Meta
- Ensure ngrok is running
- Check terminal for errors

**Messages not sending?**

- Verify `WHATSAPP_ACCESS_TOKEN` is valid
- Check phone number format: +[country code][number]
- Ensure phone is added to test numbers in Meta

**Not receiving webhooks?**

- Ensure ngrok is running
- Check webhook URL in Meta settings
- Verify events are subscribed (messages, message_status)

---

## 🚀 Production Deployment

### 1. Deploy to Vercel

Your webhook URL will be:

```
https://your-domain.vercel.app/api/webhooks/whatsapp
```

### 2. Update Meta Webhook

Change webhook URL from ngrok to your production domain:

```
https://your-domain.vercel.app/api/webhooks/whatsapp
```

### 3. Go Live

Once ready to accept real customers:

- Complete Business Verification in Meta
- Add your own WhatsApp Business number
- Remove test number restrictions
- Start receiving real messages!

---

## 📱 Features You Can Build

With this WhatsApp integration, you can:

1. **Artisan Onboarding**
   - Artisan sends photo + voice message
   - AI extracts product details
   - Creates product listing

2. **Customer Support**
   - Real-time chat support
   - Order status queries
   - Product inquiries

3. **Marketing**
   - New product announcements
   - Promotional campaigns
   - Workshop reminders

4. **Notifications**
   - Order confirmations ✅
   - Shipment tracking ✅
   - Delivery updates ✅
   - Payment confirmations ✅

---

## 📊 Next Steps

Your friend suggested building "voice + image → AI → Product" pipeline. With WhatsApp ready, you can:

1. **Receive Messages** ✅ Already implemented
2. **Download Media** - Add media download function
3. **Process with AI** - Use GPT-4 for voice transcription & image analysis
4. **Create Products** - Use existing `/api/products` endpoint

Want me to implement the AI pipeline for artisan product creation via WhatsApp? Just let me know!

---

## 🎉 Summary

You have a **production-grade WhatsApp integration** that's:

- ✅ More advanced than basic setup
- ✅ Database-backed
- ✅ Status tracking
- ✅ Ready for production
- ✅ Fully documented

**Setup Time**: 30-40 minutes  
**Status**: Ready to use! 🚀

---

**Questions?** Check the documentation or test with the examples above!
