import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface-card border border-surface-border rounded-custom p-6',
          hoverable && 'transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl hover:shadow-black/20',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
