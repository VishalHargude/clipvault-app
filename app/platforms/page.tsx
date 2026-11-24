import React from 'react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import { platformRegistry } from '../../modules/platforms/adapterRegistry';
import { Scale, Lock, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function PlatformsPage() {
  const platforms = platformRegistry.getAll();

  return (
    <main className="py-12">
      <Container className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" /> Legal & Platform Integrity
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight">
            Platform Adapters & Compliance Framework
          </h1>
          <p className="text-sm sm:text-base text-content-muted mt-2 max-w-3xl">
            In compliance with <strong>Architecture Rule 9</strong> (Never bypass DRM/CORS/Auth) and <strong>Rule 11</strong> (Never falsely advertise direct downloads), this registry documents the legal status, developer policies, and operational boundaries of all social media adapters.
          </p>
        </div>

        <Alert variant="warning" title="Platform Adapter Enforcement Policy">
          Every social media adapter is <strong>strictly disabled by default</strong>. We never utilize unauthorized web scraping, private session extraction, or DRM decryption. An adapter is only enabled when official developer credentials and platform compliance have been established.
        </Alert>

        {/* Adapters Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((adapter) => {
            const doc = adapter.getComplianceDocumentation();
            return (
              <Card key={adapter.id} className="p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-extrabold text-lg text-content-main">{adapter.displayName}</h3>
                    <Badge variant="warning">
                      <Lock className="w-3 h-3" /> Disabled (Rule 11)
                    </Badge>
                  </div>

                  <div className="space-y-3 text-xs text-content-muted">
                    <div>
                      <strong className="text-content-main block mb-1">Legal Rationale:</strong>
                      <p className="leading-relaxed">{doc.legalRationale}</p>
                    </div>

                    <div>
                      <strong className="text-content-main block mb-1">CORS & Network Restrictions:</strong>
                      <p className="leading-relaxed">{doc.corsBehavior}</p>
                    </div>

                    <div>
                      <strong className="text-content-main block mb-1">Digital Rights Management (DRM):</strong>
                      <p className="leading-relaxed">{doc.drmPolicy}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                  <span className="font-mono text-content-muted">Status: {adapter.availabilityStatus}</span>
                  <a
                    href={doc.developerPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-primary hover:underline font-semibold"
                  >
                    Developer Policy <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
