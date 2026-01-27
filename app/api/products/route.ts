import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const artisanId = searchParams.get('artisanId');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (productId) {
      // Get single product
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          artisan: {
            include: {
              user: true,
            },
          },
          images: true,
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 10,
          },
        },
      });

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      // Increment view count
      await prisma.product.update({
        where: { id: productId },
        data: { views: { increment: 1 } },
      });

      return NextResponse.json({ product });
    }

    // Build where clause
    const where: any = { status: 'ACTIVE' };

    if (category) {
      where.category = category;
    }

    if (artisanId) {
      where.artisanId = artisanId;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Get products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          artisan: {
            include: {
              user: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artisanId, title, description, price, category, stock, images, tags, ...rest } = body;

    if (!artisanId || !title || !description || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        artisanId,
        title,
        description,
        price,
        category,
        stock: stock || 0,
        slug,
        tags: tags || [],
        status: 'PENDING_REVIEW',
        ...rest,
        images: images
          ? {
              create: images.map((img: any, index: number) => ({
                url: img.url,
                altText: img.altText || title,
                position: index,
                isPrimary: index === 0,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        artisan: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
