# Deployment Guide — Zero-Budget Cloudflare Pages

## 1. Cloudflare Pages Deployment
This platform is designed to deploy on the **Free Tier of Cloudflare Pages**:
- **Build Command**: `npx @cloudflare/next-on-pages` or `npm run build`
- **Output Directory**: `.vercel/output/static` or `out`
- **Node.js Compatibility Flag**: `nodejs_compat` enabled

## 2. Environment Variables
Configure the following in the Cloudflare Pages / Vercel dashboard:
- `ADMIN_PASSWORD`: Master access password for `/admin/login`
- `ADMIN_JWT_SECRET`: High-entropy secret for HMAC token signing (minimum 32 characters)
- `NEXT_PUBLIC_APP_URL`: Production domain URL (e.g., `https://kinetix.tools`)

## 3. Cost Projection
- Hosting: **$0.00 / month** (Cloudflare Pages free tier)
- Media Storage: **$0.00 / month** (Zero server storage)
- Video Bandwidth: **$0.00 / month** (Direct-to-Device streaming)
- SSL: **$0.00** (Included free)
