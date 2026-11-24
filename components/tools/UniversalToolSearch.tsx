'use client';

import React, { useState } from 'react';
import { toolsRegistry } from '../../configuration/tools.config';
import { ToolCard } from './ToolCard';
import { Search, Filter } from 'lucide-react';

export function UniversalToolSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = toolsRegistry.filter((t) => {
    const matchesQuery = 
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.supportedFormats.some(f => f.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;

    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Search Input & Category Pills */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-content-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all tools by name, action (compress, trim, extract) or format (mp4, webp, wav)..."
            className="w-full pl-10 pr-4 py-2 bg-surface-card border border-surface-border rounded-custom text-sm text-content-main placeholder:text-content-muted/60 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'all', label: 'All Tools' },
            { id: 'video', label: 'Video' },
            { id: 'image', label: 'Image' },
            { id: 'audio', label: 'Audio' },
            { id: 'utilities', label: 'Utilities' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-surface-card text-content-muted hover:text-content-main border border-surface-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-surface-border rounded-custom bg-surface-card/40 text-content-muted text-sm">
          No media tools match &ldquo;{query}&rdquo;. Try searching for &ldquo;video&rdquo;, &ldquo;image&rdquo;, or &ldquo;audio&rdquo;.
        </div>
      )}
    </div>
  );
}
