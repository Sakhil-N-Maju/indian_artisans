#!/usr/bin/env node

/**
 * Postinstall script to generate Prisma Client
 * Handles missing DATABASE_URL during build time (e.g., Vercel)
 */

const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🔧 Generating Prisma Client...');

  // Use pnpm to run prisma generate
  const command = 'pnpm prisma generate';
  execSync(command, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });

  console.log('✅ Prisma Client generated successfully');
} catch (error) {
  console.error('❌ Error generating Prisma Client:', error.message);

  // In production builds (Vercel), we need Prisma Client
  // So we should fail if generation fails
  if (process.env.VERCEL || process.env.CI) {
    console.error('🚨 Prisma Client generation failed in CI/production environment');
    process.exit(1);
  }

  console.log('⚠️  Continuing in development mode...');
  process.exit(0);
}
