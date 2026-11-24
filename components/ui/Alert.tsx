import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}

export function Alert({ children, className, variant = 'info', title, ...props }: AlertProps) {
  const icons = {
    info: <Info className="w-5 h-5 text-brand-primary flex-shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
  };

  const variants = {
    info: 'bg-brand-primary/10 border-brand-primary/20 text-content-main',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-content-main',
    warning: 'bg-amber-500/10 border-amber-500/20 text-content-main',
    danger: 'bg-red-500/10 border-red-500/20 text-content-main',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'flex items-start gap-3 p-4 rounded-custom border text-sm',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1">
        {title && <h5 className="font-bold text-sm mb-1">{title}</h5>}
        <div className="text-content-muted leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
