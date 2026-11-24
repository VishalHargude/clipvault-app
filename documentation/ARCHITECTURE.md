# Technical Architecture Specification — Direct-to-Device Foundation

## 1. Zero-Storage Pipeline

```
[ User Browser Runtime ]
       │
       ├──► Web Worker / WASM / Web Audio API
       │      └──► Local In-Memory Transformation (0 KB Server Upload)
       │
       ├──► File System Access API (showSaveFilePicker)
       │      └──► Direct Disk Pipe (0 MB RAM Buffering on Desktop)
       │
       └──► Chunked Stream + Auto-Revoke
              └──► URL.revokeObjectURL() scheduled in 2s
```

## 2. Server Infrastructure Role
- **Static Hosting**: Cloudflare Pages Free Tier / Vercel Edge.
- **Headers Delivered**:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
  - `Permissions-Policy: camera=(self), microphone=(self), display-capture=(self)`
- **Metadata Probes**: Ephemeral `HEAD` requests only. Never relays video binary streams.

## 3. Platform Adapter Framework
- Social media platform adapters (Instagram, YouTube, TikTok, Facebook, X, Pinterest, Reddit) are implemented as decoupled modules.
- Every adapter implements `IPlatformAdapter` and is pinned to `DISABLED_UNVERIFIED` until an authorized developer API agreement is established.
- Falsely claiming or advertising direct social media downloads is prohibited by Rule 11.
