#!/usr/bin/env node

/**
 * Postinstall script to generate Prisma Client
 * Handles missing DATABASE_URL during build time (e.g., Vercel)
 */

const { execSync } = require('child_process');

try {
  console.log('🔧 Generating Prisma Client...');
  execSync('prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully');
} catch (error) {
  console.error('❌ Error generating Prisma Client:', error.message);
  console.log('⚠️  Continuing build without Prisma Client...');
  // Don't fail the build if Prisma generation fails
  // The app will handle missing client at runtime
  process.exit(0);
}
