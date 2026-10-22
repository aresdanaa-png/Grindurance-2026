import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'solid' | 'highlight';
  hoverable?: boolean;
  className?: string;
}

const VARIANT_STYLES = {
  default: 'bg-[#13151A] border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)]',
  glass: 'bg-black/60 backdrop-blur-md border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.4)]',
  solid: 'bg-[#0B0C0E] border border-white/[0.08]',
  highlight: 'bg-[#13151A] border border-[#FA6D0B]/40 shadow-[0_0_30px_rgba(250,109,11,0.15)]',
};

export function Card({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const hoverClasses = hoverable
    ? 'transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
    : '';

  return (
    <div
      className={`rounded-2xl relative overflow-hidden ${VARIANT_STYLES[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 pb-3 border-b border-white/[0.06] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-display italic uppercase text-lg sm:text-xl font-black text-white tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`font-sans text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 pt-3 border-t border-white/[0.06] flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
