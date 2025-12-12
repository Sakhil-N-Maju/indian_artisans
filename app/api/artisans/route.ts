import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artisanId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const verified = searchParams.get('verified');
    const craftType = searchParams.get('craftType');
    const state = searchParams.get('state');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (artisanId) {
      // Get single artisan
      const artisan = await prisma.artisan.findUnique({
        where: { id: artisanId },
        include: {
          user: true,
          products: {
            where: { status: 'ACTIVE' },
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
            take: 12,
          },
          stories: {
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          workshops: {
            where: { status: 'PUBLISHED' },
            orderBy: { startDate: 'desc' },
            take: 5,
          },
        },
      });

      if (!artisan) {
        return NextResponse.json({ error: 'Artisan not found' }, { status: 404 });
      }

      return NextResponse.json({ artisan });
    }

    if (userId) {
      // Get artisan by user ID
      const artisan = await prisma.artisan.findUnique({
        where: { userId },
        include: {
          user: true,
          products: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
        },
      });

      return NextResponse.json({ artisan });
    }

    // Build where clause
    const where: any = {};

    if (verified === 'true') {
      where.verified = true;
    }

    if (craftType) {
      where.craftType = craftType;
    }

    if (state) {
      where.state = state;
    }

    // Get artisans
    const [artisans, total] = await Promise.all([
      prisma.artisan.findMany({
        where,
        include: {
          user: true,
          products: {
            where: { status: 'ACTIVE' },
            take: 3,
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.artisan.count({ where }),
    ]);

    return NextResponse.json({
      artisans,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error('Artisan fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch artisans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      businessName,
      craftType,
      description,
      state,
      district,
      ...rest
    } = body;

    if (!userId || !businessName || !craftType || !state || !district) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const artisan = await prisma.artisan.create({
      data: {
        userId,
        businessName,
        craftType,
        description,
        state,
        district,
        kycStatus: 'PENDING',
        verified: false,
        ...rest,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ success: true, artisan });
  } catch (error: any) {
    console.error('Artisan creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create artisan profile' },
      { status: 500 }
    );
  }
}
