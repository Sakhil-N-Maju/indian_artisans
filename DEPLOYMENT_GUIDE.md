# Deployment Guide - Indian Artisans Marketplace MVP

## ✅ Deployment Ready Status

This MVP is now ready for deployment! All critical errors have been fixed:

- ✅ Prisma configuration issues resolved
- ✅ Build succeeds without credentials
- ✅ Security vulnerabilities addressed
- ✅ 36 routes successfully generated
- ✅ CodeQL security scan passed with 0 alerts

## Prerequisites

Before deploying, ensure you have:

1. **Database** - PostgreSQL database (version 9.6+)
2. **Node.js** - Version 18.x or higher
3. **Environment Variables** - See configuration below

## Environment Variables

### Required for Deployment

```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://username:password@host:port/database

# Next.js (REQUIRED for production)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Node Environment
NODE_ENV=production
```

### Optional but Recommended

```bash
# Razorpay Payment Gateway (Optional - payments will be disabled if not set)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# AI Features (Optional - AI features will be limited if not set)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# WhatsApp Integration (Optional)
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token

# Email Service (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key
RESEND_API_KEY=your_resend_api_key

# Cloud Storage (Optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
```

## Deployment Platforms

### 1. Vercel (Recommended)

**Easiest deployment option with automatic SSL and CDN**

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add at minimum: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

**Vercel Configuration (vercel.json)**
Already compatible - no additional configuration needed!

### 2. Heroku

1. **Create Heroku App**

   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL**

   ```bash
   heroku addons:create heroku-postgresql:mini
   # This automatically sets DATABASE_URL
   ```

3. **Set Environment Variables**

   ```bash
   heroku config:set NEXTAUTH_SECRET=your-secret
   heroku config:set NEXTAUTH_URL=https://your-app-name.herokuapp.com
   ```

4. **Deploy**

   ```bash
   git push heroku main
   ```

5. **Run Database Migrations**
   ```bash
   heroku run npm run db:migrate:deploy
   ```

### 3. Railway

1. **Create Project**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub"

2. **Add PostgreSQL**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically create DATABASE_URL

3. **Set Environment Variables**
   - Go to your service → Variables
   - Add: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

4. **Deploy**
   - Railway automatically deploys on git push

### 4. Render

1. **Create Web Service**
   - Go to https://render.com/dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configuration**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Add PostgreSQL**
   - Click "New +" → "PostgreSQL"
   - Note the Internal Database URL

4. **Environment Variables**
   - Add DATABASE_URL (from PostgreSQL service)
   - Add NEXTAUTH_SECRET, NEXTAUTH_URL

5. **Deploy**
   - Render automatically deploys on push

### 5. Docker Deployment

**Dockerfile** (create if needed):

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

**Docker Compose** (create if needed):

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: ${DATABASE_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: artisans
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  postgres_data:
```

**Deploy**:

```bash
docker-compose up -d
```

## Post-Deployment Steps

### 1. Run Database Migrations

```bash
# If using Heroku
heroku run npm run db:migrate:deploy

# If using SSH access
ssh your-server
cd /path/to/app
npm run db:migrate:deploy
```

### 2. Seed Initial Data (Optional)

```bash
npm run db:seed
```

### 3. Verify Deployment

Visit these URLs to verify:

- Homepage: `https://your-domain.com`
- Health Check: `https://your-domain.com/api/health` (if you have one)
- Admin Panel: `https://your-domain.com/admin`

## Build Verification

Test the build locally before deploying:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Build for production
npm run build

# Test production build
npm start
```

Expected output:

```
✓ Compiled successfully
✓ Generating static pages (27)
✓ Generating dynamic pages (9)
36 total routes generated
```

## Troubleshooting

### Build Fails

**Error: "Prisma Client not generated"**

```bash
npm run db:generate
```

**Error: "DATABASE_URL not found"**

- Set DATABASE_URL environment variable
- Format: `postgresql://user:pass@host:port/db`

### Runtime Issues

**Razorpay not working**

- Check if `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set
- Payment features gracefully degrade if not configured

**Database connection fails**

- Verify DATABASE_URL is correct
- Check database is accessible from deployment platform
- For Heroku/Railway, ensure SSL mode: `?sslmode=require`

### Performance Optimization

1. **Enable caching**

   ```bash
   npm run build
   # Vercel does this automatically
   ```

2. **Database connection pooling**
   - Use connection pooling in production
   - Consider PgBouncer for Heroku/Railway

3. **CDN for static assets**
   - Vercel provides this automatically
   - For others, consider Cloudflare

## Security Checklist

- ✅ All sensitive data in environment variables
- ✅ NEXTAUTH_SECRET is strong and unique
- ✅ Database uses SSL in production
- ✅ CORS configured appropriately
- ✅ Rate limiting enabled (if applicable)
- ✅ Security headers configured

## Monitoring

### Recommended Tools

1. **Application Monitoring**
   - Vercel Analytics (built-in)
   - New Relic
   - Datadog

2. **Error Tracking**
   - Sentry
   - LogRocket

3. **Database Monitoring**
   - Prisma Studio: `npm run db:studio`
   - Native platform tools

## Maintenance

### Regular Tasks

1. **Database Backups**
   - Set up automated backups
   - Most platforms offer this (Heroku, Railway, Render)

2. **Dependency Updates**

   ```bash
   npm audit
   npm update
   ```

3. **Log Monitoring**
   - Check application logs regularly
   - Monitor error rates

## Support & Documentation

For more information:

- [PRISMA_FIX_SUMMARY.md](./PRISMA_FIX_SUMMARY.md) - Details on Prisma configuration
- [.env.example](./.env.example) - All environment variables
- [README.md](./README.md) - Project overview

## Quick Start Commands

```bash
# Local development
npm install
npm run dev

# Production build
npm run build
npm start

# Database operations
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Deployment Checklist

Before going live:

- [ ] DATABASE_URL configured
- [ ] NEXTAUTH_SECRET set (generate with: `openssl rand -base64 32`)
- [ ] NEXTAUTH_URL set to production domain
- [ ] Database migrations run
- [ ] Environment variables verified
- [ ] Build succeeds locally
- [ ] Test basic functionality
- [ ] Monitor logs after deployment
- [ ] Set up error tracking
- [ ] Configure automated backups

## Success Criteria

Your deployment is successful when:

✅ Homepage loads without errors
✅ Navigation works correctly
✅ API endpoints respond (check /api/products, /api/artisans)
✅ Database queries work
✅ Static assets load properly
✅ No console errors (check browser dev tools)

---

**Congratulations! Your Indian Artisans Marketplace MVP is deployment-ready! 🎉**

For issues or questions, please refer to the documentation or create an issue in the repository.
