# Platform Compliance & Anti-Circumvention Matrix

## Strict Adherence to Rules 9 & 11

| Platform | Identifier | Default State | Developer Terms Rationale | CORS / Access Restrictions |
| :--- | :--- | :--- | :--- | :--- |
| **Instagram** | `instagram` | `DISABLED_UNVERIFIED` | Meta terms prohibit third-party crawling and unauthorized extraction. | Restrictive CORS headers on media CDNs. |
| **YouTube** | `youtube` | `DISABLED_UNVERIFIED` | Section 5.B of YouTube Terms prohibits downloading without an explicit YouTube download button. | Google playback CDNs enforce origin & signature checks. |
| **TikTok** | `tiktok` | `DISABLED_UNVERIFIED` | Unauthenticated video harvesting and watermark removal violate copyright policy. | Dynamic sign headers required. |
| **Facebook** | `facebook` | `DISABLED_UNVERIFIED` | Meta platform terms prohibit media extraction without Graph API. | Origin whitelist blocks third-party browser Fetch. |
| **X (Twitter)** | `x-twitter` | `DISABLED_UNVERIFIED` | X Developer Terms require official v2 API agreements. | Video manifests restricted. |
| **Pinterest** | `pinterest` | `DISABLED_UNVERIFIED` | Mass scraping of pins is prohibited. | Non-whitelisted origins blocked. |
| **Reddit** | `reddit` | `DISABLED_UNVERIFIED` | Reddit Data API terms prohibit third-party media ripping. | v.redd.it requires session tokens. |

**No adapter is enabled until an official developer agreement is established.**
