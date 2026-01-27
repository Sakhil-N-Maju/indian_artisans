# WhatsApp Integration - Quick Start

## ✅ What's Already Done

Your platform has **complete WhatsApp Business API integration** already implemented:

- ✅ WhatsApp service class ([lib/services/whatsapp.ts](lib/services/whatsapp.ts))
- ✅ Webhook handlers ([app/api/webhooks/whatsapp/route.ts](app/api/webhooks/whatsapp/route.ts))
- ✅ Database models for message tracking
- ✅ Environment variables configured
- ✅ Test script ready

---

## 🚀 Quick Activation (30 minutes)

### Step 1: Get Meta Credentials (10 min)

1. Go to https://developers.facebook.com/apps
2. Create a new app → Select "Business" type
3. Add WhatsApp product
4. Copy these credentials from the API Setup page:
   - **Phone Number ID**
   - **Access Token** (temporary for testing, permanent for production)
   - **Business Account ID**

### Step 2: Update Environment Variables (2 min)

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Update these values in `.env.local`:

```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_custom_secret_token_here
```

### Step 3: Set Up ngrok (5 min)

**Install ngrok:**

```powershell
# Windows with Chocolatey
choco install ngrok

# Or download from https://ngrok.com/download
```

**Start your app and ngrok:**

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)

### Step 4: Configure Webhook in Meta (5 min)

1. In Meta app dashboard → WhatsApp → Configuration
2. Click "Edit" on Webhook
3. Enter:
   - **Callback URL**: `https://your-ngrok-url.ngrok-free.app/api/webhooks/whatsapp`
   - **Verify Token**: Same as `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in your `.env.local`
4. Click "Verify and Save"
5. Subscribe to webhook fields:
   - ✅ `messages`
   - ✅ `message_status`

### Step 5: Test It! (5 min)

**Update test file with your number:**

Edit `test-whatsapp.ts` line 39:

```typescript
const testPhoneNumber = '+919876543210'; // Replace with your number
```

**Run test:**

```bash
npm install -D tsx
npx tsx test-whatsapp.ts
```

You should receive WhatsApp messages! 📱

---

## 📱 Usage Examples

### Send Order Confirmation

```typescript
import { whatsappService } from '@/lib/services/whatsapp';

await whatsappService.sendOrderConfirmation(
  user.phone, // e.g., '+919876543210'
  order.id,
  user.id
);
```

### Send Shipping Update

```typescript
await whatsappService.sendShipmentUpdate(user.phone, order.id, 'TRK123456789', 'BlueDart', user.id);
```

### Send Custom Message

```typescript
await whatsappService.sendTextMessage('+919876543210', 'Your custom message here 🎨', userId);
```

---

## 📊 Message Tracking

All messages are automatically logged in the database:

```typescript
// View messages in Prisma Studio
npx prisma studio

// Or query programmatically
const messages = await prisma.whatsAppMessage.findMany({
  where: { userId: 'user123' },
  orderBy: { createdAt: 'desc' }
});
```

---

## 🔧 Available Functions

| Function                                                        | Purpose                |
| --------------------------------------------------------------- | ---------------------- |
| `sendTextMessage(phone, message, userId)`                       | Send plain text        |
| `sendTemplateMessage(phone, template, lang, params, userId)`    | Send approved template |
| `sendOrderConfirmation(phone, orderId, userId)`                 | Order confirmation     |
| `sendShipmentUpdate(phone, orderId, tracking, carrier, userId)` | Shipping update        |
| `sendDeliveryConfirmation(phone, orderNumber, userId)`          | Delivery confirmation  |
| `sendBackInStockNotification(phone, product, url, userId)`      | Stock alert            |
| `sendWorkshopReminder(phone, title, startTime, userId)`         | Workshop reminder      |

---

## 📖 Complete Documentation

See [WHATSAPP_SETUP.md](WHATSAPP_SETUP.md) for:

- Detailed setup instructions
- Message template creation
- Production deployment
- Troubleshooting guide
- Rate limits and best practices

---

## 🎯 Integration Points

WhatsApp is integrated in:

1. **Order Flow** → Order confirmations
2. **Shipping** → Tracking updates
3. **Delivery** → Delivery notifications
4. **Products** → Back-in-stock alerts
5. **Workshops** → Reminders
6. **Customer Support** → Incoming message handling

---

## ⚠️ Important Notes

1. **Phone Format**: Must include country code (e.g., `+91` for India)
2. **Templates**: Business-initiated messages require approved templates
3. **24-hour Window**: Can send free-form messages within 24 hours of user message
4. **Rate Limits**: 1,000 conversations/month on free tier
5. **User Consent**: Always get permission before sending messages

---

## 🚨 Troubleshooting

**Messages not sending?**

- Check phone number format includes `+` and country code
- Verify access token hasn't expired (temp tokens last 24 hours)
- Check Meta dashboard for error messages

**Webhook not working?**

- Ensure ngrok is running
- Verify callback URL is correct
- Check verify token matches exactly
- Look at server logs for errors

**Need help?**
See full troubleshooting guide in [WHATSAPP_SETUP.md](WHATSAPP_SETUP.md)

---

## ✅ Checklist

- [ ] Created Meta app and added WhatsApp product
- [ ] Copied credentials to `.env.local`
- [ ] Started development server (`npm run dev`)
- [ ] Started ngrok (`ngrok http 3000`)
- [ ] Configured webhook in Meta dashboard
- [ ] Subscribed to webhook events
- [ ] Updated test phone number in `test-whatsapp.ts`
- [ ] Ran test script (`npx tsx test-whatsapp.ts`)
- [ ] Received test messages on WhatsApp ✅
- [ ] Tested sending a message to test number
- [ ] Verified message appears in database

---

**Ready to go! 🎉**

WhatsApp is fully integrated and ready to enhance your customer communication.
