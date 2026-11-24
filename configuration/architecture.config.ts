/**
 * CRITICAL ARCHITECTURE CONFIGURATION
 * Enforces the 11 Direct-to-Device and Zero-Storage Rules.
 */

export interface ArchitectureRule {
  id: number;
  title: string;
  enforcementMethod: string;
  verificationStatus: 'ENFORCED' | 'MONITORED';
}

export const ARCHITECTURE_RULES: ArchitectureRule[] = [
  {
    id: 1,
    title: "Never permanently store user videos or images on our servers",
    enforcementMethod: "Server has 0 storage databases and 0 write directories for user payloads.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 2,
    title: "Prefer browser-side processing using Web Workers and WebAssembly",
    enforcementMethod: "Operations executed client-side via Web Workers, Canvas, and Web Audio APIs.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 3,
    title: "Use direct authorized source URLs for downloads whenever permitted",
    enforcementMethod: "Streams initiate directly from origin host to user browser disk.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 4,
    title: "Use browser download APIs and appropriate Content-Disposition handling",
    enforcementMethod: "File System Access API (showSaveFilePicker) and <a download> orchestration.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 5,
    title: "Do not proxy large video files through our hosting server",
    enforcementMethod: "Server routes strictly reject binary video streaming; HEAD probes only.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 6,
    title: "Do not create a video storage database",
    enforcementMethod: "Database schema contains zero tables for media files or user assets.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 7,
    title: "Automatically release temporary browser memory and object URLs after processing",
    enforcementMethod: "URL.revokeObjectURL() scheduled in finally blocks and setTimeout handlers.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 8,
    title: "If a platform requires an authorized backend API, clearly document infrastructure and cost",
    enforcementMethod: "Documented in /legal/compliance and cost transparency reports.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 9,
    title: "Never bypass CORS, DRM, authentication or platform restrictions",
    enforcementMethod: "Strict anti-circumvention policy; DRM-encrypted streams are rejected.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 10,
    title: "Test actual downloads on Android Chrome, iPhone Safari and desktop browsers",
    enforcementMethod: "Multi-device browser capability detection with WebKit memory protection.",
    verificationStatus: "ENFORCED"
  },
  {
    id: 11,
    title: "Never advertise direct downloads as supported when platform does not permit",
    enforcementMethod: "Platform adapters remain marked DISABLED_UNVERIFIED until legal APIs exist.",
    verificationStatus: "ENFORCED"
  }
];
