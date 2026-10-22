import React, { ReactNode } from 'react';

export type BadgeVariant = 'orange' | 'dark' | 'outline' | 'white' | 'accent';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  withPulse?: boolean;
  className?: string;
  children: ReactNode;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  orange: 'bg-[#FA6D0B] text-black font-black shadow-[0_0_12px_rgba(250,109,11,0.35)]',
  dark: 'bg-white/5 text-slate-300 border border-white/10',
  outline: 'border border-[#FA6D0B]/60 text-[#FA6D0B] bg-[#FA6D0B]/5',
  white: 'bg-white text-black font-black',
  accent: 'bg-black/70 text-white border border-white/10',
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'text-[9px] px-2 py-0.5 rounded',
  md: 'text-[10px] px-2.5 py-1 rounded-md',
  lg: 'text-xs px-3 py-1.5 rounded-lg',
};

export default function Badge({
  variant = 'dark',
  size = 'md',
  withPulse = false,
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider select-none whitespace-nowrap ${
        VARIANT_STYLES[variant]
      } ${SIZE_STYLES[size]} ${className}`}
    >
      {withPulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#FA6D0B] animate-pulse shrink-0" />
      )}
      <span>{children}</span>
    </span>
  );
}
