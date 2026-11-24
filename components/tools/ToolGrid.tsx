import React from 'react';
import { toolsRegistry, ToolDefinition } from '../../configuration/tools.config';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  category?: 'video' | 'image' | 'audio' | 'utilities' | 'direct-download';
  limit?: number;
}

export function ToolGrid({ category, limit }: ToolGridProps) {
  let tools = toolsRegistry;
  if (category) {
    tools = tools.filter(t => t.category === category);
  }
  if (limit) {
    tools = tools.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
