#!/usr/bin/env node

/**
 * Postinstall script to generate Prisma Client
 * Handles missing DATABASE_URL during build time (e.g., Vercel)
 */

const { execSync } = require('child_process');

try {
  // Set a dummy DATABASE_URL if not present (for build environments)
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not found, using placeholder for build...');
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
  }

  console.log('🔧 Generating Prisma Client...');
  execSync('prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully');
} catch (error) {
  console.error('❌ Error generating Prisma Client:', error.message);
  // Don't fail the build if Prisma generation fails
  // The app will handle missing client at runtime
  process.exit(0);
}
