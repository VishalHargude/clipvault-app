import React from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="py-12 bg-slate-50/50 dark:bg-slate-900/50 min-h-screen">
      <Container className="max-w-4xl space-y-8">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-primary">
            Legal & Compliance Framework
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Terms of Service & Legal Disclaimer
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Effective Date: November 24, 2026 • Version 3.4 (Watertight Statutory Protection)
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
          
          <Alert variant="info" title="Strict Zero-Hosting & Direct-to-Device Technical Architecture">
            ClipVault operates strictly as an <strong>ephemeral, automated, technical conduit</strong>. We do <strong>NOT</strong> host, store, index, cache, or rebroadcast any media, videos, audio, or images on our servers. All stream processing and file creation executes in-memory and writes directly to your local device storage.
          </Alert>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-primary" /> 1. Complete Non-Affiliation & Trademark Notice
            </h2>
            <p>
              ClipVault is an independent online media utility. ClipVault is <strong>not affiliated, associated, authorized, endorsed by, sponsored by, or in any way officially connected with</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs">
              <li><strong>Instagram™ & Meta Platforms, Inc.</strong></li>
              <li><strong>YouTube™ & Google LLC / Alphabet Inc.</strong></li>
              <li><strong>TikTok™ & ByteDance Ltd.</strong></li>
              <li><strong>Twitter™ / X™ & X Corp.</strong></li>
              <li><strong>Pinterest™ & Pinterest, Inc.</strong></li>
              <li><strong>Reddit™ & Reddit, Inc.</strong></li>
              <li><strong>Threads™ & Meta Platforms, Inc.</strong></li>
              <li><strong>Snapchat™ & Snap Inc.</strong></li>
              <li><strong>Telegram™ & Telegram FZ-LLC / Telegram Group Inc.</strong></li>
              <li><strong>ShareChat™ & Mohalla Tech Pvt. Ltd.</strong></li>
              <li><strong>Moj™ & Mohalla Tech Pvt. Ltd.</strong></li>
              <li><strong>Odnoklassniki™ (OK.ru) & VK Company.</strong></li>
            </ul>
            <p className="text-xs">
              All product names, logos, copyrights, and trademarks referenced on this website are the registered intellectual property of their respective owners. The use of any third-party trademark is purely for nominative compatibility identification and does not imply any endorsement, sponsorship, or partnership.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> 2. Statutory Safe Harbor & Intermediary Protection
            </h2>
            <p>
              ClipVault operates in strict compliance with statutory intermediary safe harbor frameworks, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs">
              <li><strong>Title II of the US Digital Millennium Copyright Act (17 U.S.C. § 512(a)):</strong> Ephemeral and transient digital network communications conduit immunity.</li>
              <li><strong>Section 79 of the Information Technology Act, 2000:</strong> Complete safe harbor exemption for network intermediaries providing automated access without initiating transmission or selecting receivers.</li>
              <li><strong>Directive 2000/31/EC (EU E-Commerce Directive) Articles 12–14:</strong> Passive conduit and caching exemptions.</li>
            </ul>
            <p className="text-xs">
              Our automated system does not modify, edit, index, select, or curate any third-party stream. Transmission is initiated entirely and exclusively at the voluntary command of the individual user.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> 3. User Authorization, Warranty & Sole Responsibility
            </h2>
            <p>
              By inputting any URL into ClipVault or downloading any media, <strong>you expressly warrant, represent, and certify under penalty of law that:</strong>
            </p>
            <ol className="list-decimal pl-6 space-y-1.5 text-xs">
              <li>You are the lawful copyright owner of the media, OR you hold an express license or authorization from the copyright holder, OR your download constitutes legitimate <strong>Fair Use</strong> (such as for non-commercial commentary, research, education, archival, parody, or personal backup).</li>
              <li>You will <strong>NOT</strong> redistribute, sell, broadcast, monetize, or publicly perform any downloaded material without express written consent from the rights holder.</li>
              <li>You assume <strong>100% sole and exclusive legal responsibility</strong> for any copyright violations, intellectual property claims, or regulatory breaches resulting from your use of this service.</li>
            </ol>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" /> 4. Strict Comprehensive Indemnification Clause
            </h2>
            <p className="text-xs leading-relaxed font-medium bg-slate-100 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              YOU EXPRESSLY AGREE TO INDEMNIFY, DEFEND, AND HOLD COMPLETELY HARMLESS CLIPVAULT, ITS FOUNDERS, OWNERS, OPERATORS, DEVELOPERS, AFFILIATES, AGENTS, HOSTING PROVIDERS, AND LICENSORS FROM AND AGAINST ANY AND ALL CLAIMS, LAWSUITS, LIABILITIES, LOSSES, DAMAGES, JUDGMENTS, PENALTIES, AND EXPENSES (INCLUDING REASONABLE ATTORNEYS&apos; FEES) ARISING OUT OF OR IN CONNECTION WITH: (A) YOUR USE OR MISUSE OF THIS WEBSITE; (B) ANY INFRINGEMENT OR ALLEGED INFRINGEMENT OF ANY INTELLECTUAL PROPERTY OR OTHER RIGHT OF ANY THIRD PARTY BY YOU; OR (C) ANY BREACH OF THESE TERMS OF SERVICE BY YOU.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" /> 5. Anti-Circumvention Policy (No DRM Bypass)
            </h2>
            <p>
              In strict adherence to <strong>Section 1201 of the US DMCA</strong> and international copyright treaties, ClipVault does not decrypt, decode, bypass, hack, or circumvent any technological protection measures (TPMs), Digital Rights Management (DRM) technologies (including Widevine, FairPlay, or PlayReady), or private user authentication paywalls. ClipVault only interacts with publicly accessible, unencrypted HTTP/HTTPS public media streams.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-slate-500" /> 6. Disclaimer of Warranties & Absolute Limitation of Liability
            </h2>
            <p className="text-xs">
              CLIPVAULT IS PROVIDED STRICTLY ON AN <strong>&quot;AS IS&quot;</strong> AND <strong>&quot;AS AVAILABLE&quot;</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES SHALL CLIPVAULT OR ITS OPERATORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THIS SERVICE. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED ZERO DOLLARS ($0.00).
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" /> 7. DMCA Copyright Notice & Takedown Agent
            </h2>
            <p>
              If you are a copyright owner or an agent thereof and believe that any technological link generated by users infringes upon your copyright, you may submit a formal notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Designated Agent with the necessary statutory details via email at:
            </p>
            <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-xl font-mono text-xs text-brand-primary font-bold">
              Email: legal@clipvalut.com (Subject: DMCA Takedown Request)
            </div>
            <p className="text-xs">
              Because ClipVault does not host or store any media files, our primary remediation is blocking specific URLs or domains from being processed by our conduit.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <Link href="/" className="font-bold text-brand-primary hover:underline">
              ← Return to Downloader
            </Link>
            <Link href="/legal/privacy" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
              Read Privacy Policy →
            </Link>
          </div>

        </Card>
      </Container>
    </main>
  );
}
