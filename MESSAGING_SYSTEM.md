# 💬 Messaging System with WhatsApp Integration

## Overview

A complete messaging system that allows users to communicate with artisans through the platform, with messages being delivered via WhatsApp Business API. Artisans can reply either through WhatsApp or the website interface.

## Features

### ✅ User Features

- **Message Popup**: Click "Message" button on artisan profiles to open a messaging popup
- **Conversation View**: Dedicated messages page showing all conversations with artisans
- **Real-time Updates**: Unread message count displayed on navigation bar
- **Message History**: Full conversation history stored locally and synced
- **Direct WhatsApp Integration**: Messages sent to artisans via WhatsApp
- **Two-way Communication**: Artisans can reply via WhatsApp or website

### ✅ Technical Implementation

#### 1. Message Context (`lib/message-context.tsx`)

- Global state management for conversations
- LocalStorage persistence
- Functions:
  - `sendMessage()` - Send message to artisan
  - `markAsRead()` - Mark conversation as read
  - `getConversation()` - Get specific conversation
  - `addArtisanReply()` - Add reply from artisan
- Auto-sync with localStorage

#### 2. Message Popup (`components/message-popup.tsx`)

- Modal dialog for sending messages
- Shows artisan info and profile picture
- Textarea for message composition
- Send/Cancel actions
- Loading state during sending
- Success/error notifications

#### 3. Messages Page (`app/messages/page.tsx`)

- Two-column layout: conversations list + chat area
- Conversation list shows:
  - Artisan profile picture
  - Last message preview
  - Timestamp
  - Unread count badge
- Chat area shows:
  - Full message history
  - User messages (blue, right-aligned)
  - Artisan messages (gray, left-aligned)
  - Timestamps for each message
  - Message input with send button
- Back button to return to previous page

#### 4. Navigation Integration (`components/navigation.tsx`)

- Message icon (MessageCircle) in navbar
- Red badge showing unread count
- Responsive: shows in desktop and mobile menus
- Badge hidden when no unread messages

#### 5. Artisan Profile Integration (`app/artisans/[id]/page.tsx`)

- Back button added at top
- Message button opens popup
- Passes artisan ID, name, and image to popup

### 🔌 API Routes

#### `/api/messages/send` (POST)

Sends user message to artisan via WhatsApp Business API

```typescript
Request: {
  artisanId: string;
  artisanName: string;
  content: string;
  messageId: string;
}

Response: {
  success: boolean;
  messageId: string;
  artisanPhone: string;
}
```

#### `/api/messages/webhook` (GET/POST)

Receives WhatsApp webhook events

- **GET**: Webhook verification
- **POST**: Receives incoming messages and status updates

#### `/api/messages/replies` (GET)

Fetches artisan replies from database

```typescript
Query: {
  artisanId: string;
}

Response: {
  success: boolean;
  messages: Array<{
    id: string;
    content: string;
    timestamp: Date;
    waMessageId: string;
  }>;
}
```

## WhatsApp Integration Flow

### Sending Messages (User → Artisan)

1. User clicks "Message" button on artisan profile
2. Types message in popup and clicks "Send"
3. Frontend calls `/api/messages/send`
4. Backend formats message with platform branding
5. Sends to artisan's WhatsApp via Meta Business API
6. Stores in database with OUTBOUND direction
7. Returns success to frontend
8. Message appears in conversation history

### Receiving Replies (Artisan → User)

1. Artisan replies on WhatsApp
2. Meta sends webhook POST to `/api/messages/webhook`
3. Backend receives message payload
4. Stores in database with INBOUND direction
5. Links to original conversation via phone number
6. Marks message as read on WhatsApp
7. Frontend polls or receives push notification
8. Reply appears in user's conversation

## Setup Instructions

### 1. Environment Variables

Add to `.env.local`:

```env
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_random_secret_token
```

### 2. Database Schema

The system uses existing `WhatsAppMessage` model from Prisma:

```prisma
model WhatsAppMessage {
  id           String   @id @default(cuid())
  userId       String?
  phone        String
  direction    String   // OUTBOUND or INBOUND
  messageType  String
  content      String?
  waMessageId  String?
  status       String
  metadata     Json?
  sentAt       DateTime?
  receivedAt   DateTime?
  errorMessage String?
  createdAt    DateTime @default(now())
}
```

### 3. Webhook Configuration

1. Go to Meta Developer Console
2. Navigate to WhatsApp → Configuration
3. Set Webhook URL: `https://yourdomain.com/api/messages/webhook`
4. Set Verify Token: (same as `WHATSAPP_WEBHOOK_VERIFY_TOKEN`)
5. Subscribe to events:
   - `messages`
   - `message_status`

### 4. Artisan Phone Numbers

Update `/api/messages/send/route.ts` with real artisan phone numbers:

```typescript
const artisanWhatsAppNumbers: Record<string, string> = {
  '1': '+919876543210', // Priya Sharma
  '2': '+919876543211', // Another Artisan
  // Add more mappings
};
```

In production, fetch from database:

```typescript
const artisan = await prisma.artisan.findUnique({
  where: { id: artisanId },
  select: { whatsappNumber: true },
});
```

## Usage

### For Users

1. **Browse artisans** → Navigate to artisan profile
2. **Click "Message"** → Popup opens
3. **Type message** → Enter your question or comment
4. **Send** → Message delivered to artisan's WhatsApp
5. **View conversation** → Click message icon in navbar
6. **Check replies** → Artisan replies appear in chat

### For Artisans

**Option 1: Reply via WhatsApp**

- Receive message on WhatsApp
- Reply directly in WhatsApp app
- Reply syncs to platform automatically

**Option 2: Reply via Website** (future feature)

- Login to artisan dashboard
- Navigate to messages section
- View and reply to customer messages

## Message Format

### To Artisan (WhatsApp)

```
New message from Artisans of India platform:

[User's message content]

---
Reply to this message to respond to the customer.
```

### From Artisan (displayed on website)

```
[Artisan's reply content]
```

## Notifications

### User Notifications

- ✅ Success: "Message sent successfully!"
- ❌ Error: "Failed to send message"
- 🔔 Unread count badge on navbar
- 📬 Auto-dismiss after 3 seconds

### Message Sent Event

```typescript
window.dispatchEvent(
  new CustomEvent('messageSent', {
    detail: { artisanName, content },
  })
);
```

### Notification Event

```typescript
window.dispatchEvent(
  new CustomEvent('showNotification', {
    detail: { message: '...', type: 'success' | 'error' },
  })
);
```

## File Structure

```
lib/
  message-context.tsx          # State management

components/
  message-popup.tsx            # Message modal
  message-notification.tsx     # Toast notifications
  navigation.tsx               # Navbar with message icon

app/
  messages/
    page.tsx                   # Messages inbox page
  artisans/[id]/
    page.tsx                   # Artisan profile (with message button)
  api/
    messages/
      send/
        route.ts               # Send message API
      webhook/
        route.ts               # WhatsApp webhook
      replies/
        route.ts               # Fetch replies API
```

## Future Enhancements

- [ ] Real-time updates via WebSockets/SSE
- [ ] Artisan dashboard for web-based replies
- [ ] Rich media support (images, documents)
- [ ] Message templates for quick replies
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message search and filtering
- [ ] Push notifications
- [ ] Audio message support
- [ ] Message encryption

## Testing

### Test Sending Messages

1. Navigate to any artisan profile
2. Click "Message" button
3. Type a test message
4. Click "Send"
5. Check WhatsApp for artisan (if using real number)
6. Check database for OUTBOUND message record

### Test Receiving Replies

1. Send message from artisan's WhatsApp to platform number
2. Webhook should receive POST request
3. Check database for INBOUND message record
4. Check messages page for reply

### Test Webhook Verification

```bash
curl "https://yourdomain.com/api/messages/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=TEST"
```

## Troubleshooting

### Messages not sending

- Check WhatsApp API credentials in `.env`
- Verify phone number format (include country code)
- Check API rate limits
- Review error logs in console

### Webhook not receiving

- Verify webhook URL is publicly accessible
- Check verify token matches
- Ensure HTTPS is enabled
- Check Meta Developer Console logs

### Messages not appearing

- Check localStorage for conversation data
- Verify API responses in Network tab
- Check console for React errors
- Ensure MessageProvider wraps app

## Security Considerations

- ✅ Webhook verify token validation
- ✅ Environment variables for secrets
- ✅ Input sanitization for messages
- ⚠️ Add rate limiting for message sending
- ⚠️ Add authentication for API routes
- ⚠️ Implement message encryption
- ⚠️ Add CSRF protection

## Performance

- LocalStorage caching for conversations
- Lazy loading of message history
- Optimistic UI updates
- Auto-scroll to latest message
- Efficient re-renders with React Context

---

**Built with:** Next.js 14, TypeScript, Meta WhatsApp Business API, Prisma, Tailwind CSS
