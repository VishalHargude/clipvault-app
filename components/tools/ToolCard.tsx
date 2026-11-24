import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '../../configuration/tools.config';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  FileSearch, 
  Minimize2, 
  Scissors, 
  ImageDown, 
  RefreshCw, 
  Scaling, 
  Music2, 
  Sliders, 
  Binary, 
  DownloadCloud,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileSearch: <FileSearch className="w-5 h-5" />,
  Minimize2: <Minimize2 className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  ImageDown: <ImageDown className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  Scaling: <Scaling className="w-5 h-5" />,
  Music2: <Music2 className="w-5 h-5" />,
  Sliders: <Sliders className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  DownloadCloud: <DownloadCloud className="w-5 h-5" />,
};

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const icon = iconMap[tool.icon] || <DownloadCloud className="w-5 h-5" />;

  const getToolUrl = () => {
    if (tool.category === 'direct-download') return '/direct-download';
    return `/tools/${tool.category}#${tool.slug}`;
  };

  return (
    <Card hoverable className="flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-custom bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
            {icon}
          </div>
          {tool.badge && (
            <Badge variant="primary">{tool.badge}</Badge>
          )}
        </div>

        <h3 className="font-bold text-base text-content-main mb-2 group-hover:text-brand-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-content-muted leading-relaxed mb-4">
          {tool.description}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-xs text-content-muted/80 mb-4 font-mono">
          <span>Max: {tool.maxRecommendedSizeMb}MB</span>
          <span>•</span>
          <span className="text-emerald-400">100% In-Browser</span>
        </div>

        <Link
          href={getToolUrl()}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-custom bg-surface-bg border border-surface-border group-hover:border-brand-primary/50 text-content-main group-hover:text-brand-primary text-xs font-bold uppercase tracking-wider transition-all"
        >
          Launch Tool <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Card>
  );
}
