'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Alert } from '../../../components/ui/Alert';
import { useBrand } from '../../../branding/BrandProvider';
import { toolsRegistry } from '../../../configuration/tools.config';
import { platformRegistry } from '../../../modules/platforms/adapterRegistry';
import { 
  ShieldCheck, 
  Settings, 
  Palette, 
  Wrench, 
  Scale, 
  Database, 
  LogOut, 
  CheckCircle2,
  HardDrive,
  Megaphone,
  Globe,
  FileText,
  AlertTriangle,
  Lock,
  Power
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { brand, updateBrand } = useBrand();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'branding' | 'tools' | 'platforms' | 'ads' | 'seo' | 'blog' | 'legal' | 'settings'
  >('overview');

  const [serverInfo, setServerInfo] = useState<any>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable branding states
  const [siteName, setSiteName] = useState(brand.websiteName);
  const [shortName, setShortName] = useState(brand.shortName);
  const [primaryColor, setPrimaryColor] = useState(brand.colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(brand.colors.secondary);
  const [borderRadius, setBorderRadius] = useState(brand.borderRadius);

  // Ads & Maintenance States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [headerAdEnabled, setHeaderAdEnabled] = useState(true);
  const [footerAdEnabled, setFooterAdEnabled] = useState(true);

  // SEO States
  const [seoTitle, setSeoTitle] = useState(brand.websiteName);
  const [seoDesc, setSeoDesc] = useState(brand.description);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/admin/config', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setServerInfo(data))
      .catch(() => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleSaveBranding = () => {
    updateBrand({
      websiteName: siteName,
      shortName,
      colors: {
        ...brand.colors,
        primary: primaryColor,
        secondary: secondaryColor,
      },
      borderRadius
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <main className="py-12">
      <Container className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Root Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main mt-1">
              Administrator Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {maintenanceMode ? (
              <Badge variant="warning"><AlertTriangle className="w-3.5 h-3.5 mr-1" /> Maintenance Active</Badge>
            ) : (
              <Badge variant="success">System Online</Badge>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <Alert variant="success" title="Settings Applied">
            Branding configuration updated dynamically. All styles reflected across the application.
          </Alert>
        )}

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-surface-border gap-1 overflow-x-auto text-xs sm:text-sm font-semibold pb-1">
          {[
            { id: 'overview', label: 'Overview', icon: <Database className="w-4 h-4" /> },
            { id: 'branding', label: 'Branding & Theme', icon: <Palette className="w-4 h-4" /> },
            { id: 'tools', label: 'Tools Management', icon: <Wrench className="w-4 h-4" /> },
            { id: 'platforms', label: 'Platform Adapters', icon: <Scale className="w-4 h-4" /> },
            { id: 'ads', label: 'Advertisement Slots', icon: <Megaphone className="w-4 h-4" /> },
            { id: 'seo', label: 'SEO & Meta', icon: <Globe className="w-4 h-4" /> },
            { id: 'blog', label: 'Blog & Content', icon: <FileText className="w-4 h-4" /> },
            { id: 'legal', label: 'Legal Pages', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 pb-3 px-3.5 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-brand-primary text-brand-primary font-bold'
                  : 'text-content-muted hover:text-content-main'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">Server Media Storage</span>
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-400">0.00 KB</div>
                <p className="text-xs text-content-muted mt-1">Rule 1 & 6: Zero persistent video database</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">Video Proxy Egress</span>
                  <HardDrive className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-400">0 KB / mo</div>
                <p className="text-xs text-content-muted mt-1">Rule 5: No file proxying through server</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">Platform Adapters</span>
                  <Scale className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-extrabold text-amber-400">7 Active (Disabled)</div>
                <p className="text-xs text-content-muted mt-1">Rule 11: Disabled until verified legal API</p>
              </Card>
            </div>

            {serverInfo && (
              <Card className="p-6 space-y-3">
                <h3 className="font-bold text-sm text-content-main">Runtime Telemetry</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-content-muted">
                  <div>Node Runtime: <strong className="text-content-main">{serverInfo.nodeVersion}</strong></div>
                  <div>Uptime: <strong className="text-content-main">{Math.round(serverInfo.serverUptimeSeconds)}s</strong></div>
                  <div>Heap Memory: <strong className="text-content-main">{serverInfo.memoryUsageMb} MB</strong></div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* 2. Branding & Colours */}
        {activeTab === 'branding' && (
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="font-bold text-base text-content-main">Theme & Identity Settings</h3>
              <p className="text-xs text-content-muted mt-1">
                Update brand identity and color tokens without source-code editing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">Website Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">Short Brand Name</label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">Border Radius</label>
                  <input
                    type="text"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">Primary Color (Hex)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-surface-border bg-transparent"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">Secondary Color (Hex)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-surface-border bg-transparent"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-border">
              <Button onClick={handleSaveBranding}>
                <CheckCircle2 className="w-4 h-4 mr-2" /> Apply Branding Changes
              </Button>
            </div>
          </Card>
        )}

        {/* 3. Tools Management */}
        {activeTab === 'tools' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-content-main">Active Tools Registry ({toolsRegistry.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toolsRegistry.map((tool) => (
                <Card key={tool.id} className="p-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-content-main">{tool.name}</h4>
                    <p className="text-xs text-content-muted mt-1">{tool.description}</p>
                    <div className="mt-2 text-[11px] font-mono text-content-muted">
                      Max: {tool.maxRecommendedSizeMb}MB | Category: {tool.category}
                    </div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 4. Platforms */}
        {activeTab === 'platforms' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-content-main">Platform Adapters & Compliance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformRegistry.getAll().map((adapter) => (
                <Card key={adapter.id} className="p-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-content-main">{adapter.displayName}</h4>
                    <p className="text-xs text-content-muted mt-1">{adapter.getComplianceDocumentation().legalRationale}</p>
                    <div className="mt-2 text-[11px] font-mono text-amber-400">
                      Status: {adapter.availabilityStatus}
                    </div>
                  </div>
                  <Badge variant="warning">Disabled (Rule 11)</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 5. Advertisement Management */}
        {activeTab === 'ads' && (
          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-base text-content-main flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-brand-primary" /> Advertisement Slots & Google AdSense
            </h3>
            <p className="text-xs text-content-muted">
              Configure monetization banners without modifying layout code.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-bg border border-surface-border rounded-custom">
                <div>
                  <strong className="text-sm text-content-main block">Header Leaderboard (728x90)</strong>
                  <span className="text-xs text-content-muted">Displayed below navigation bar on desktop</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHeaderAdEnabled(!headerAdEnabled)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                    headerAdEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-card text-content-muted'
                  }`}
                >
                  {headerAdEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-bg border border-surface-border rounded-custom">
                <div>
                  <strong className="text-sm text-content-main block">Footer Banner (Responsive)</strong>
                  <span className="text-xs text-content-muted">Displayed right above the footer</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFooterAdEnabled(!footerAdEnabled)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                    footerAdEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-card text-content-muted'
                  }`}
                >
                  {footerAdEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* 6. SEO Management */}
        {activeTab === 'seo' && (
          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-base text-content-main flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-secondary" /> Global SEO & OpenGraph Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-content-muted uppercase mb-1">Global Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-content-muted uppercase mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-bg border border-surface-border rounded-custom text-sm text-content-main"
                />
              </div>
            </div>
          </Card>
        )}

        {/* 7. Blog Management */}
        {activeTab === 'blog' && (
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-content-main flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" /> Blog & Editorial Manager
            </h3>
            <p className="text-xs text-content-muted">
              Publish educational articles and release notes to boost organic search rankings.
            </p>
            <div className="p-4 bg-surface-bg border border-surface-border rounded-custom text-xs text-content-muted text-center py-8">
              No blog posts published yet. Connect Markdown CMS in Step 2.
            </div>
          </Card>
        )}

        {/* 8. Legal Pages */}
        {activeTab === 'legal' && (
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-content-main">Legal & Compliance Policy Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <a href="/legal/terms" className="p-4 bg-surface-bg border border-surface-border rounded-custom hover:border-brand-primary block">
                <strong className="text-content-main block mb-1">/legal/terms</strong>
                <span>Terms of Service (IT Act Sec 79 & DMCA 512)</span>
              </a>
              <a href="/legal/privacy" className="p-4 bg-surface-bg border border-surface-border rounded-custom hover:border-brand-primary block">
                <strong className="text-content-main block mb-1">/legal/privacy</strong>
                <span>Zero-Storage Privacy Architecture Guarantee</span>
              </a>
              <a href="/legal/dmca" className="p-4 bg-surface-bg border border-surface-border rounded-custom hover:border-brand-primary block">
                <strong className="text-content-main block mb-1">/legal/dmca</strong>
                <span>DMCA Notice & Statutory Grievance Redressal</span>
              </a>
              <a href="/legal/compliance" className="p-4 bg-surface-bg border border-surface-border rounded-custom hover:border-brand-primary block">
                <strong className="text-content-main block mb-1">/legal/compliance</strong>
                <span>Architecture Transparency & $0 Cost Breakdown</span>
              </a>
            </div>
          </Card>
        )}

        {/* 9. System Settings */}
        {activeTab === 'settings' && (
          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-base text-content-main flex items-center gap-2">
              <Power className="w-5 h-5 text-red-400" /> System Control & Maintenance
            </h3>

            <div className="flex items-center justify-between p-4 bg-surface-bg border border-surface-border rounded-custom">
              <div>
                <strong className="text-sm text-content-main block">Maintenance Mode</strong>
                <span className="text-xs text-content-muted">Redirect all incoming traffic to maintenance splash screen</span>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`px-4 py-2 rounded-custom text-xs font-bold uppercase transition-colors ${
                  maintenanceMode ? 'bg-red-500 text-white' : 'bg-surface-card text-content-muted'
                }`}
              >
                {maintenanceMode ? 'Active' : 'Disabled'}
              </button>
            </div>
          </Card>
        )}
      </Container>
    </main>
  );
}
