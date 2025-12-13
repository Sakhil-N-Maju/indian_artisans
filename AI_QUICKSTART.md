# 🚀 Quick Start: AI Product Creation

Get your AI-powered product creation system running in 5 minutes!

## Prerequisites

✅ You already have:
- Indian Artisans platform running
- WhatsApp Cloud API configured
- Database setup complete

## Step 1: Get OpenAI API Key (2 minutes)

1. Visit https://platform.openai.com/signup
2. Create account (or login)
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Name it: "Indian Artisans AI"
6. Copy the key (starts with `sk-proj-...`)
7. **Save it immediately** - you won't see it again!

## Step 2: Add API Key to Environment (30 seconds)

Open `.env` file and add:

```env
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## Step 3: Add Credits (1 minute)

1. Visit https://platform.openai.com/settings/organization/billing
2. Click "Add payment method"
3. Add at least $5 (enough for ~125 products)
4. Credits don't expire

**Cost**: ~₹3.50 per product (~$0.04)

## Step 4: Restart Server (10 seconds)

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## Step 5: Test (2 minutes)

### Option A: Quick Test via API

```bash
# Send a test WhatsApp image first to get media ID
# Then test quick analysis:

curl "http://localhost:3000/api/ai/products?mediaId=YOUR_MEDIA_ID"
```

**Expected Response:**
```json
{
  "success": true,
  "analysis": "Handcrafted terracotta pot with traditional designs"
}
```

### Option B: Full WhatsApp Test

1. **Send a product image** to your WhatsApp test number
   
2. **Receive response:**
   ```
   📸 Image received! Now send a voice message describing your product.
   
   I can see: "Handwoven basket". Please describe it in your own words.
   ```

3. **Send voice description** (any language):
   ```
   "This is a handwoven bamboo basket made using traditional techniques..."
   ```

4. **Receive confirmation:**
   ```
   🤖 Processing with AI... (30 seconds)
   
   ✅ Product created successfully!
   
   📦 Traditional Handwoven Bamboo Basket
   💰 Suggested Price: ₹1,500
   📁 Category: Home Decor
   
   Confidence Score: 93%
   ```

5. **Verify in database:**
   ```bash
   npm run db:studio
   # Check Products table for new entry
   ```

## ✅ You're Done!

Your AI pipeline is now live. Artisans can create products via WhatsApp!

---

## Next Steps

### Production Setup

1. **Set Usage Limits** (recommended)
   - Visit https://platform.openai.com/settings/organization/limits
   - Set monthly limit: $50 (protects from unexpected costs)

2. **Monitor Usage**
   - Dashboard: https://platform.openai.com/usage
   - Check daily for first week

3. **Add Error Monitoring**
   - Set up Sentry or similar
   - Track AI processing failures

4. **Beta Test**
   - Invite 5-10 artisans to test
   - Collect feedback on quality
   - Iterate on AI prompts

### Customization

Edit AI prompts in `lib/services/ai.ts`:

```typescript
// Line 142 - Product extraction prompt
const extractionPrompt = `...your custom instructions...`;

// Line 199 - Story generation prompt
const storyPrompt = `...your custom story template...`;
```

### Advanced Features

- **Image Quality Check**: Add validation for image resolution
- **Auto-Translation**: Translate products to multiple languages
- **Batch Processing**: Process multiple products simultaneously
- **Review Dashboard**: Build UI for reviewing AI-created products
- **A/B Testing**: Compare AI vs manual product performance

---

## Troubleshooting

### "Invalid API Key"
- Check `.env` has correct `OPENAI_API_KEY`
- Verify no extra spaces or quotes
- Restart server after changing `.env`

### "Insufficient Credits"
- Add payment method at https://platform.openai.com/settings/organization/billing
- Minimum $5 recommended for testing

### "Processing Failed"
- Check voice message is clear (not too short)
- Ensure image is high quality
- View terminal logs for detailed error

### "No Response from WhatsApp"
- Verify webhook is configured in Meta dashboard
- Check ngrok is running and URL is correct
- Ensure WhatsApp access token is valid

---

## Cost Estimation

### Per Product:
- Voice Transcription: ~$0.01
- Image Analysis: ~$0.01
- Product Extraction: ~$0.02
- Story Generation: ~$0.01
- **Total: ~$0.04 (₹3.50)**

### Monthly Estimates:
- 10 products/day: ~$12/month (₹1,000)
- 50 products/day: ~$60/month (₹5,000)
- 100 products/day: ~$120/month (₹10,000)

Compare to manual listing creation:
- Manual time: 15-20 minutes per product
- AI time: 30 seconds
- **Time saved: 97%**

---

## Support

📖 **Full Documentation**: [AI_PIPELINE.md](AI_PIPELINE.md)  
🧪 **Testing Guide**: [AI_TESTING.md](AI_TESTING.md)  
🏗️ **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)  

**OpenAI Help**:
- API Docs: https://platform.openai.com/docs
- Community: https://community.openai.com
- Status: https://status.openai.com

---

**Ready to empower artisans with AI!** 🚀
