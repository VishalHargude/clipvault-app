# Security Foundation & Protection Architecture

## 1. SSRF Protection (`security/ssrfProtection.ts`)
All server-side URL requests (e.g. metadata `HEAD` probes) pass through strict SSRF validation:
- Loopback addresses (`127.0.0.0/8`, `localhost`, `::1`) are blocked.
- RFC1918 Private ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) are blocked.
- Cloud metadata endpoints (`169.254.169.254`, `metadata.google.internal`) are blocked.
- Only HTTP and HTTPS protocols with no embedded credentials are permitted.

## 2. Secure HTTP Headers (`next.config.mjs` & `security/secureHeaders.ts`)
- `Cross-Origin-Opener-Policy`: `same-origin`
- `Cross-Origin-Embedder-Policy`: `require-corp`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `SAMEORIGIN`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(self), microphone=(self), display-capture=(self)`

## 3. Rate Limiting (`security/rateLimiter.ts`)
- Public inspection routes are throttled to 30 requests/minute.
- Admin login route is throttled to 5 attempts/minute.
