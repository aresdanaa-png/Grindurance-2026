import React, { ReactNode } from 'react';

export interface SectionHeaderProps {
  tag?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  tag,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl text-left'
      } mb-12 sm:mb-16 ${className}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#FA6D0B] tracking-wider uppercase mb-4 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {tag}
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl font-display uppercase italic tracking-tight font-black text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
