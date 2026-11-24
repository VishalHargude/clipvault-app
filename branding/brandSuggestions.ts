/**
 * 10 Unique International Brand Name Suggestions for Global Media Tools SaaS
 * Criteria: Short, memorable, easy to pronounce, globally scalable, no trademark conflicts.
 */

export interface BrandSuggestion {
  id: number;
  name: string;
  tagline: string;
  pronunciation: string;
  linguisticOrigin: string;
  strengths: string[];
}

export const BRAND_SUGGESTIONS: BrandSuggestion[] = [
  {
    id: 1,
    name: "Kinetix",
    tagline: "Ultra-Fast Direct-to-Device Media Engine",
    pronunciation: "ki-NET-iks",
    linguisticOrigin: "Greek (Kinesis: movement, dynamic energy)",
    strengths: ["Strong tech connotation", "Memorable 'X' ending", "High-velocity brand feel"]
  },
  {
    id: 2,
    name: "Veloxio",
    tagline: "Direct Media Processing & Zero-Storage Saver",
    pronunciation: "veh-LOKS-ee-oh",
    linguisticOrigin: "Latin (Velox: swift, rapid)",
    strengths: ["Sleek global SaaS sound", "Rolls off the tongue in all languages", "Modern .io appeal"]
  },
  {
    id: 3,
    name: "OmniFlux",
    tagline: "Unified Browser-Side Media Suite",
    pronunciation: "OM-nee-fluks",
    linguisticOrigin: "Latin (Omnis: all, universal + Flux: flow)",
    strengths: ["Communicates all-in-one capability", "Smooth sound", "Highly authoritative"]
  },
  {
    id: 4,
    name: "SnapStrand",
    tagline: "Instant Client-Side Video & Audio Tools",
    pronunciation: "SNAP-strand",
    linguisticOrigin: "English (Snap: instant + Strand: media stream)",
    strengths: ["Friendly & accessible", "Clean consumer & prosumer appeal", "Strong visual imagery"]
  },
  {
    id: 5,
    name: "StratoByte",
    tagline: "Next-Gen Direct Media Utilities",
    pronunciation: "STRAT-oh-bite",
    linguisticOrigin: "Greek (Strato: upper tier/sky + Byte: digital unit)",
    strengths: ["Enterprise credibility", "Distinguishable from casual downloader sites", "Tech-forward"]
  },
  {
    id: 6,
    name: "ZenoStream",
    tagline: "Zero-Persistence Client Media Pipeline",
    pronunciation: "ZEE-noh-stream",
    linguisticOrigin: "Greek (Zeno: pure logic / Zero: zero storage)",
    strengths: ["Directly highlights zero-storage architecture", "Clean phonetic rhythm", "Modern"]
  },
  {
    id: 7,
    name: "MediaVerve",
    tagline: "High-Performance In-Browser Creative Suite",
    pronunciation: "MEE-dee-uh-vurv",
    linguisticOrigin: "French/English (Verve: enthusiasm, vigor, dynamism)",
    strengths: ["Sophisticated creative feel", "Positive brand emotion", "Easy recall"]
  },
  {
    id: 8,
    name: "AxiomMedia",
    tagline: "Trustworthy Global Media Toolkit",
    pronunciation: "AK-see-um MEE-dee-uh",
    linguisticOrigin: "Greek (Axioma: self-evident truth / established rule)",
    strengths: ["High trust & compliance positioning", "Corporate & creator ready", "Distinctive"]
  },
  {
    id: 9,
    name: "QuantaDrive",
    tagline: "Direct-to-Device Media Architecture",
    pronunciation: "KWAN-tuh drive",
    linguisticOrigin: "Latin (Quantum: fundamental discrete unit)",
    strengths: ["Signals direct-to-device streaming speed", "Memorable combination", "Powerful"]
  },
  {
    id: 10,
    name: "PulseForge",
    tagline: "Browser-Accelerated Video & Audio Processing",
    pronunciation: "PULS-forj",
    linguisticOrigin: "English (Pulse: rhythm/signal + Forge: craft, build)",
    strengths: ["Creator-centric", "Active verbs", "Ideal for trimming, compression, and tools"]
  }
];
