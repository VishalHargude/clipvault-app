/**
 * Centralized Tools Registry
 * Documents every browser-side utility and its operational constraints.
 */

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  category: 'video' | 'image' | 'audio' | 'utilities' | 'direct-download';
  description: string;
  icon: string;
  badge?: string;
  browserOnly: boolean;
  workerSupported: boolean;
  supportedFormats: string[];
  maxRecommendedSizeMb: number;
}

export const toolsRegistry: ToolDefinition[] = [
  // Video Tools
  {
    id: "video-metadata",
    name: "Video Metadata Inspector",
    slug: "video-metadata",
    category: "video",
    description: "Extract exact resolution, aspect ratio, frame duration, and orientation client-side.",
    icon: "FileSearch",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["mp4", "webm", "mov", "mkv"],
    maxRecommendedSizeMb: 500
  },
  {
    id: "video-compressor",
    name: "In-Browser Video Compressor",
    slug: "video-compressor",
    category: "video",
    description: "Compress video files for Mobile, Email, or Web using local hardware acceleration.",
    icon: "Minimize2",
    badge: "WASM",
    browserOnly: true,
    workerSupported: true,
    supportedFormats: ["mp4", "webm"],
    maxRecommendedSizeMb: 250
  },
  {
    id: "video-trimmer",
    name: "Precision Video Trimmer",
    slug: "video-trimmer",
    category: "video",
    description: "Slice and cut video clips with millisecond timeline markers without uploading to servers.",
    icon: "Scissors",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["mp4", "webm"],
    maxRecommendedSizeMb: 300
  },

  // Image Tools
  {
    id: "image-compressor",
    name: "Smart Image Compressor",
    slug: "image-compressor",
    category: "image",
    description: "Compress JPG, PNG, and WebP images with instant visual quality comparison in browser memory.",
    icon: "ImageDown",
    badge: "Fast",
    browserOnly: true,
    workerSupported: true,
    supportedFormats: ["jpg", "jpeg", "png", "webp"],
    maxRecommendedSizeMb: 50
  },
  {
    id: "image-converter",
    name: "Image Format Transcoder",
    slug: "image-converter",
    category: "image",
    description: "Convert images between WebP, PNG, and JPEG with custom canvas rendering.",
    icon: "RefreshCw",
    browserOnly: true,
    workerSupported: true,
    supportedFormats: ["jpg", "png", "webp", "bmp"],
    maxRecommendedSizeMb: 50
  },
  {
    id: "image-resizer",
    name: "Proportional Image Resizer",
    slug: "image-resizer",
    category: "image",
    description: "Resize photos by dimensions or percentage with aspect-ratio locking.",
    icon: "Scaling",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["jpg", "png", "webp"],
    maxRecommendedSizeMb: 50
  },

  // Audio Tools
  {
    id: "audio-extractor",
    name: "Video to Audio Ripper",
    slug: "audio-extractor",
    category: "audio",
    description: "Extract pure 16-bit 44.1kHz stereo audio from video files using Web Audio API.",
    icon: "Music2",
    badge: "Lossless",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["mp4", "webm", "mkv", "avi", "mov"],
    maxRecommendedSizeMb: 200
  },
  {
    id: "audio-metadata",
    name: "Audio Header Inspector",
    slug: "audio-metadata",
    category: "audio",
    description: "Detect sample rate, duration, and channel configuration without uploading.",
    icon: "Sliders",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["mp3", "wav", "aac", "ogg"],
    maxRecommendedSizeMb: 100
  },

  // File Utilities
  {
    id: "mime-detector",
    name: "Magic Byte MIME Inspector",
    slug: "mime-detector",
    category: "utilities",
    description: "Determine true binary file types using signature header inspection, ignoring misleading file extensions.",
    icon: "Binary",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["*"],
    maxRecommendedSizeMb: 100
  },
  {
    id: "direct-downloader",
    name: "Direct-to-Device Stream Saver",
    slug: "direct-downloader",
    category: "direct-download",
    description: "Pipes authorized external media links directly to local disk with zero server proxying.",
    icon: "DownloadCloud",
    badge: "Direct",
    browserOnly: true,
    workerSupported: false,
    supportedFormats: ["mp4", "webm", "mp3", "wav", "jpg", "png", "pdf"],
    maxRecommendedSizeMb: 2000
  }
];
