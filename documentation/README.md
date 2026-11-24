# Kinetix Media Suite — Global Media Tools SaaS Foundation (Step 1)

Kinetix is a high-performance global media tools SaaS platform built from the ground up on a **Zero-Storage, Direct-to-Device Download Architecture**.

---

## 1. Core Principles
1. **Zero Server Storage**: User media files are never written to server disks or databases.
2. **Browser-Side Processing**: Heavy tasks (transcoding, image conversion, audio extraction) run in Web Workers, Web Audio, and Canvas APIs.
3. **Direct-to-Device Streaming**: Authorized files stream straight from origin CDNs to local device storage.
4. **No Public Registration**: All free tools are accessible without login or user accounts.
5. **Strict Anti-Circumvention**: We never bypass DRM, CORS, paywalls, or platform restrictions.

---

## 2. Directory Structure
```
global-media-tools/
├── app/                  # Next.js 14 App Router pages & API routes
├── branding/             # Centralized branding config (brand.config.ts) & suggestions
├── configuration/        # Site navigation, tool registry, architecture rules
├── modules/
│   ├── platforms/        # Adapter framework (Instagram, YouTube, TikTok, etc.)
│   ├── video/            # In-browser video metadata & validation
│   ├── image/            # Canvas-based compression, conversion & resize
│   ├── audio/            # Web Audio API in-memory WAV extraction
│   └── utilities/        # Binary signature MIME detector & batch processor
├── components/           # Reusable UI, Layout, and Tool components
├── admin/                # Administrator session auth & token generation
├── security/             # SSRF protection, input validation, rate limiting
├── privacy/              # Zero-persistence memory revocation manager
├── SEO/                  # Dynamic Next.js metadata & Schema.org JSON-LD
├── hooks/                # Custom React hooks (useDirectDownload, useBrand)
├── workers/              # Off-thread Web Worker scripts
├── tests/                # Automated test suite
└── documentation/        # Technical, architecture, and deployment specifications
```
