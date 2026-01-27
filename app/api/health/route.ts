import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: process.env.DATABASE_URL ? 'configured' : 'not configured',
      razorpay: process.env.RAZORPAY_KEY_ID ? 'configured' : 'not configured',
      whatsapp: process.env.WHATSAPP_ACCESS_TOKEN ? 'configured' : 'not configured',
    },
  });
}
