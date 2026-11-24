import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Container({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge(clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className))} {...props}>
      {children}
    </div>
  );
}
