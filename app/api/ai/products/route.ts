import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/ai';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageMediaId, voiceMediaId, artisanId } = body;

    if (!imageMediaId || !voiceMediaId || !artisanId) {
      return NextResponse.json(
        { error: 'Missing required fields: imageMediaId, voiceMediaId, artisanId' },
        { status: 400 }
      );
    }

    // Get artisan info
    const artisan = await prisma.artisan.findUnique({
      where: { id: artisanId },
      include: { user: true },
    });

    if (!artisan) {
      return NextResponse.json({ error: 'Artisan not found' }, { status: 404 });
    }

    // Process with AI
    const productData = await aiService.processArtisanMedia(
      imageMediaId,
      voiceMediaId,
      {
        id: artisan.id,
        name: artisan.businessName,
        location: `${artisan.district}, ${artisan.state}`,
        experience: artisan.experience || undefined,
      }
    );

    // Create product
    const slug = `${productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    
    const product = await prisma.product.create({
      data: {
        artisanId: artisan.id,
        title: productData.title,
        description: productData.description,
        aiStory: productData.story,
        price: productData.suggestedPrice,
        category: productData.category,
        craftType: productData.craftType,
        material: productData.material,
        color: productData.color,
        tags: productData.tags,
        slug,
        status: 'PENDING_REVIEW',
        stock: 1,
      },
    });

    return NextResponse.json({
      success: true,
      product,
      aiData: productData,
    });
  } catch (error: any) {
    console.error('AI product creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product with AI' },
      { status: 500 }
    );
  }
}

// Test endpoint for image analysis only
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('mediaId');

    if (!mediaId) {
      return NextResponse.json(
        { error: 'Missing mediaId parameter' },
        { status: 400 }
      );
    }

    const imageBuffer = await aiService.downloadWhatsAppMedia(mediaId);
    const analysis = await aiService.quickImageAnalysis(imageBuffer);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
