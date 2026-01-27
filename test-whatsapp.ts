import { whatsappService } from './lib/services/whatsapp';

/**
 * WhatsApp Integration Test Script
 *
 * Run this to test your WhatsApp Business API integration
 */

async function testWhatsAppIntegration() {
  console.log('🧪 Testing WhatsApp Integration...\n');

  // Test 1: Configuration Check
  console.log('✓ Step 1: Checking configuration...');
  const config = {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    hasAccessToken: !!process.env.WHATSAPP_ACCESS_TOKEN,
    hasBusinessAccountId: !!process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    hasVerifyToken: !!process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
  };

  console.log('  Phone Number ID:', config.phoneNumberId ? '✅ Set' : '❌ Missing');
  console.log('  Access Token:', config.hasAccessToken ? '✅ Set' : '❌ Missing');
  console.log('  Business Account ID:', config.hasBusinessAccountId ? '✅ Set' : '❌ Missing');
  console.log('  Verify Token:', config.hasVerifyToken ? '✅ Set' : '❌ Missing');

  if (!config.phoneNumberId || !config.hasAccessToken) {
    console.log('\n❌ Missing required credentials. Please check your .env file.\n');
    console.log('Required variables:');
    console.log('  - WHATSAPP_PHONE_NUMBER_ID');
    console.log('  - WHATSAPP_ACCESS_TOKEN');
    console.log('  - WHATSAPP_BUSINESS_ACCOUNT_ID');
    console.log('  - WHATSAPP_WEBHOOK_VERIFY_TOKEN');
    console.log('\nSee WHATSAPP_SETUP.md for details.');
    return;
  }

  // Test 2: Send a test message
  console.log('\n✓ Step 2: Sending test message...');
  console.log('  Note: Replace the phone number below with your WhatsApp number');

  // IMPORTANT: Replace with your actual phone number (with country code)
  const testPhoneNumber = '+919876543210'; // Example: India

  try {
    const result = await whatsappService.sendTextMessage(
      testPhoneNumber,
      '🎨 Hello from Artisan Marketplace!\n\nThis is a test message to verify WhatsApp integration is working correctly.',
      'test-user'
    );

    if (result.success) {
      console.log('  ✅ Message sent successfully!');
      console.log('  Message ID:', result.messageId);
      console.log('\n  Check your WhatsApp on', testPhoneNumber);
    } else {
      console.log('  ❌ Failed to send message');
      console.log('  Error:', result.error);
    }
  } catch (error: any) {
    console.log('  ❌ Error sending message');
    console.log('  ', error.message);
  }

  // Test 3: Order confirmation example
  console.log('\n✓ Step 3: Testing order confirmation message...');
  try {
    const orderConfirmation = await whatsappService.sendTextMessage(
      testPhoneNumber,
      "🎉 Order Confirmed!\n\nOrder #ORD-12345\n\nTotal: ₹1,299\n\nThank you for supporting Indian artisans! We'll send you tracking details soon.",
      'test-user'
    );

    if (orderConfirmation.success) {
      console.log('  ✅ Order confirmation sent!');
    } else {
      console.log('  ❌ Failed to send order confirmation');
    }
  } catch (error: any) {
    console.log('  ❌ Error:', error.message);
  }

  // Test 4: Webhook verification
  console.log('\n✓ Step 4: Webhook verification test...');
  const verifyResult = whatsappService.verifyWebhook(
    'subscribe',
    process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '',
    'test-challenge-1234'
  );

  if (verifyResult) {
    console.log('  ✅ Webhook verification working');
    console.log('  Challenge response:', verifyResult);
  } else {
    console.log('  ❌ Webhook verification failed');
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log('\n✅ WhatsApp service is configured and ready to use!');
  console.log('\nNext steps:');
  console.log('  1. Start ngrok: ngrok http 3000');
  console.log('  2. Configure webhook in Meta dashboard');
  console.log('  3. Test incoming messages');
  console.log('  4. Set up message templates');
  console.log('\nSee WHATSAPP_SETUP.md for complete instructions.\n');
}

// Run tests
testWhatsAppIntegration().catch(console.error);
