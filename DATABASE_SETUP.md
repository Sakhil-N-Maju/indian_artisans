# Database Setup Guide

## Issue Fixed ✅

The error `Module not found: Can't resolve '@prisma/client'` has been resolved by:

1. Creating `.env` file with `DATABASE_URL`
2. Generating Prisma Client with `npx prisma generate`

## Database Configuration

The project uses **PostgreSQL** as the database. You have several options:

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL:**
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Start PostgreSQL:**
   - Windows: Use PostgreSQL service in Services app
   - Mac/Linux: `brew services start postgresql` or `sudo service postgresql start`

3. **Create Database:**

   ```bash
   psql -U postgres
   CREATE DATABASE artisans;
   \q
   ```

4. **Update `.env` file:**

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/artisans"
   ```

   Replace `password` with your PostgreSQL password.

5. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

### Option 2: Free Cloud PostgreSQL (Easiest)

#### Neon (Recommended)

1. Go to https://neon.tech/
2. Sign up for free account
3. Create a new project
4. Copy the connection string
5. Update `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb"
   ```
6. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

#### Supabase

1. Go to https://supabase.com/
2. Create new project
3. Go to Settings → Database
4. Copy connection string (Pooler mode)
5. Update `.env` with the connection string
6. Run migrations

#### Railway

1. Go to https://railway.app/
2. Create new project → Add PostgreSQL
3. Copy connection string from Variables tab
4. Update `.env`
5. Run migrations

### Option 3: Docker PostgreSQL

```bash
# Start PostgreSQL in Docker
docker run --name artisans-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=artisans -p 5432:5432 -d postgres

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/artisans"

# Run migrations
npx prisma migrate dev
```

## Current Status

- ✅ Prisma Client generated
- ⚠️ Database connection pending (update DATABASE_URL in .env)
- ⚠️ Migrations need to be run once database is connected

## Quick Start (Using Neon - Fastest)

```bash
# 1. Go to https://neon.tech and create free database
# 2. Copy connection string
# 3. Update .env file with your DATABASE_URL
# 4. Run migration
npx prisma migrate dev

# 5. Start development server
npm run dev
```

## Verify Setup

```bash
# Test database connection
npx prisma db push

# Open Prisma Studio to view database
npx prisma studio
```

## Troubleshooting

### Error: "Can't reach database server"

- Check if PostgreSQL is running
- Verify DATABASE_URL is correct
- Check firewall settings
- For cloud databases, check IP whitelist

### Error: "Authentication failed"

- Verify username and password in DATABASE_URL
- Check if user has proper permissions

### Error: "Database does not exist"

- Create the database first: `CREATE DATABASE artisans;`
- Or use `npx prisma db push` to create schema

## For Production

When deploying to production:

1. Set up production database (Neon, Supabase, Railway, AWS RDS, etc.)
2. Update DATABASE_URL in production environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Never commit `.env` or `.env.local` files!

## WhatsApp Integration (Optional)

The messaging system requires WhatsApp Business API credentials:

```env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
```

See `WHATSAPP_QUICK_START.md` for setup instructions.
