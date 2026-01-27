# 🧪 AI Pipeline Testing Guide

## Quick Test Checklist

### Prerequisites

- [ ] OpenAI API key configured in `.env`
- [ ] WhatsApp Cloud API configured
- [ ] ngrok running (for webhook)
- [ ] Development server running (`npm run dev`)
- [ ] At least one artisan account in database

---

## Test 1: Quick Image Analysis (2 minutes)

### Using API Endpoint

```bash
# 1. Send an image to WhatsApp test number
# 2. Check webhook logs for media ID
# 3. Test quick analysis

curl "http://localhost:3000/api/ai/products?mediaId=YOUR_MEDIA_ID"
```

**Expected Response:**

```json
{
  "success": true,
  "analysis": "Handcrafted terracotta pot with traditional designs"
}
```

---

## Test 2: Full Pipeline (Via WhatsApp) (5 minutes)

### Step-by-Step

1. **Register as Artisan**

   ```bash
   # Create test artisan via API or database
   POST /api/artisans
   {
     "userId": "existing-user-id",
     "businessName": "Test Artisan",
     "craftType": "Pottery",
     "state": "Maharashtra",
     "district": "Mumbai"
   }
   ```

2. **Send Test Message**

   ```
   WhatsApp: "help"
   ```

   **Expected:**

   ```
   👋 Welcome Test Artisan!

   📸 To create a product listing:
   1. Send a clear photo of your product
   2. Send a voice message describing it

   I'll use AI to create a professional listing for you!
   ```

3. **Send Product Image**

   ```
   WhatsApp: [Send image of craft]
   ```

   **Expected:**

   ```
   📸 Image received! Now send a voice message describing
   your product (language doesn't matter - Hindi, English,
   or any regional language).

   I can see: "Handwoven basket". Please describe it in
   your own words via voice message.
   ```

4. **Send Voice Description**

   ```
   WhatsApp: [Record voice]
   "This is a handwoven bamboo basket made using traditional techniques..."
   ```

   **Expected:**

   ```
   🤖 Perfect! Processing your product with AI...
   This will take about 30 seconds.

   ✅ Product created successfully!

   📦 Traditional Handwoven Bamboo Basket
   💰 Suggested Price: ₹1,500
   📁 Category: Home Decor

   Confidence Score: 93%
   ```

5. **Verify in Database**
   ```bash
   npm run db:studio
   # Check Product table for new entry
   # Verify AI-generated fields populated
   ```

---

## Test 3: API Endpoint (3 minutes)

```bash
# Prerequisite: Have image and voice media IDs from WhatsApp

POST http://localhost:3000/api/ai/products
Content-Type: application/json

{
  "imageMediaId": "wamid.HBgNOTE4NjUzNDM0MzUyFQIAERgSNEE4Q0E3RjdBQzA5MUYxNjcxAA==",
  "voiceMediaId": "wamid.HBgNOTE4NjUzNDM0MzUyFQIAERgSNEE4Q0E3RjdBQzA5MUYxNjcyAA==",
  "artisanId": "your-artisan-id"
}
```

**Expected Response:**

```json
{
  "success": true,
  "product": {
    "id": "...",
    "title": "Traditional Handwoven Bamboo Basket",
    "description": "A masterpiece of traditional weaving...",
    "category": "Home Decor",
    "price": 1500,
    ...
  },
  "aiData": {
    "title": "Traditional Handwoven Bamboo Basket",
    "suggestedPrice": 1500,
    "confidence": 0.93,
    "story": "Crafted by skilled artisan..."
  }
}
```

---

## Test 4: Error Scenarios

### Test Invalid Media ID

```bash
GET http://localhost:3000/api/ai/products?mediaId=invalid-id
```

**Expected:**

```json
{
  "error": "Failed to download media: ..."
}
```

### Test Missing OpenAI Key

```bash
# Remove OPENAI_API_KEY from .env
# Restart server
# Try processing

# Expected: Warning logged, graceful failure
```

### Test WhatsApp Timeout

```bash
# Send image
# Wait 11 minutes (timeout is 10 min)
# Send voice

# Expected: "Upload cancelled" message
```

---

## Test 5: Multi-Language Support

### Hindi Test

```
Voice: "Yeh ek haath se bana bamboo basket hai. Maine isse
        traditional technique se banaya hai..."

Expected: Transcribes correctly, creates product listing
```

### English Test

```
Voice: "This is a handcrafted bamboo basket made using
        traditional weaving techniques..."

Expected: Works seamlessly
```

### Regional Language Test

```
Voice: [Record in Tamil/Telugu/Bengali]

Expected: Whisper auto-detects and transcribes
```

---

## Test 6: Product Quality Check

### Check AI-Generated Content

```typescript
// Verify product in database
const product = await prisma.product.findFirst({
  where: {
    aiStory: { not: null },
  },
  orderBy: { createdAt: 'desc' },
});

console.log({
  title: product.title, // Should be catchy, under 80 chars
  description: product.description, // Should be 200-400 words
  aiStory: product.aiStory, // Should be 150-250 words
  category: product.category, // Should be valid category
  price: product.price, // Should be reasonable
  tags: product.tags, // Should have 3-5 relevant tags
});
```

---

## Monitoring & Debugging

### Check Webhook Logs

```bash
# In your terminal running the dev server
# You'll see detailed logs:

📥 Downloading media from WhatsApp...
🎤 Transcribing voice...
🖼️  Analyzing image...
🤖 Extracting product details...
📖 Generating product story...
✅ Product processing complete!
```

### Check OpenAI Usage

1. Visit: https://platform.openai.com/usage
2. Monitor API calls and costs
3. Check for errors

### Check Database

```bash
npm run db:studio

# Tables to check:
# - Product (new AI-generated products)
# - WhatsAppMessage (message logs)
# - Artisan (artisan info used for context)
```

---

## Performance Benchmarks

### Expected Processing Times

| Step                | Time       | Cost       |
| ------------------- | ---------- | ---------- |
| Download media      | 2-5s       | Free       |
| Voice transcription | 5-10s      | $0.01      |
| Image analysis      | 3-7s       | $0.01      |
| Product extraction  | 8-15s      | $0.02      |
| Story generation    | 5-10s      | $0.01      |
| **Total**           | **25-45s** | **~$0.05** |

### Optimization Tips

1. **Parallel Processing**: Image and voice analyzed simultaneously ✅
2. **Caching**: Cache artisan info (already implemented) ✅
3. **Batch Processing**: Process multiple products together (future)
4. **CDN**: Store images on CDN (future)

---

## Common Issues & Solutions

### Issue: "OPENAI_API_KEY not found"

**Solution:**

```bash
# Add to .env
OPENAI_API_KEY="sk-proj-xxxxx"
# Restart server
```

### Issue: "Failed to download media"

**Solution:**

- Check WHATSAPP_ACCESS_TOKEN is valid
- Media IDs expire after 30 days
- Ensure webhook received the message

### Issue: "Transcription failed"

**Solution:**

- Voice message might be too short
- Ensure audio format is supported (ogg, mp3, m4a)
- Check OpenAI API status

### Issue: "Low confidence score"

**Solution:**

- Image quality might be poor
- Voice description might be unclear
- Manual review and edit recommended

### Issue: "Product not created"

**Solution:**

- Check artisan exists in database
- Verify database connection
- Check API logs for errors

---

## Production Readiness Checklist

Before going live:

- [ ] OpenAI API key is production key (not test)
- [ ] Set up OpenAI usage limits
- [ ] Configure monitoring alerts
- [ ] Set up error reporting (Sentry)
- [ ] Add rate limiting (max 10 products/hour per artisan)
- [ ] Test with real artisans (beta program)
- [ ] Prepare support documentation
- [ ] Train customer support team
- [ ] Set up product review workflow
- [ ] Configure auto-moderation rules

---

## Success Metrics

Track these metrics:

```typescript
// Products created via AI
const aiProducts = await prisma.product.count({
  where: { aiStory: { not: null } },
});

// Average confidence score
const avgConfidence = await prisma.product.aggregate({
  where: { aiStory: { not: null } },
  _avg: {
    /* confidence field */
  },
});

// Processing time
// Log in WhatsApp webhook

// Error rate
const errors = await prisma.whatsAppMessage.count({
  where: {
    direction: 'OUTBOUND',
    content: { contains: '❌' },
  },
});
```

---

## Next Steps After Testing

1. ✅ **Confirm AI works** - All tests pass
2. 🎨 **Customize prompts** - Adjust for your brand voice
3. 📊 **Set up analytics** - Track usage and quality
4. 🚀 **Beta launch** - Test with 5-10 real artisans
5. 📈 **Iterate** - Improve based on feedback
6. 🌟 **Full launch** - Roll out to all artisans

---

## Support

**Documentation:**

- Main: `AI_PIPELINE.md`
- WhatsApp: `WHATSAPP_SETUP.md`
- Architecture: `ARCHITECTURE.md`

**API References:**

- OpenAI: https://platform.openai.com/docs
- WhatsApp: https://developers.facebook.com/docs/whatsapp

**Debugging:**

- Check terminal logs
- Use `npm run db:studio`
- Monitor OpenAI dashboard

---

**Ready to test? Follow Test 2 for the full experience!** 🚀
