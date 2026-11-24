import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full px-4 py-2.5 bg-surface-bg border border-surface-border rounded-custom text-content-main placeholder:text-content-muted/60 text-sm transition-all focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-content-muted mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
