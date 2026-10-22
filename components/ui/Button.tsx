'use client';

import React, { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'micro';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

export type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
    target?: string;
    rel?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#FA6D0B] text-black font-black hover:bg-[#DE5A00] shadow-[0_0_25px_rgba(250,109,11,0.4)] hover:shadow-[0_0_35px_rgba(250,109,11,0.65)] active:scale-95 border border-transparent',
  secondary:
    'bg-white/5 text-slate-200 border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-white/[0.08] active:scale-95',
  outline:
    'bg-transparent text-white border border-white/20 hover:border-[#FA6D0B] hover:text-[#FA6D0B] hover:bg-[#FA6D0B]/10 active:scale-95',
  ghost:
    'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 border border-transparent',
  micro:
    'bg-white/5 text-slate-300 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider border border-white/10 hover:border-[#FA6D0B] hover:text-[#FA6D0B] active:scale-95',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-full',
  md: 'px-5 py-2.5 text-xs sm:text-sm rounded-full',
  lg: 'px-6 py-3.5 text-xs sm:text-sm rounded-full',
  xl: 'px-8 py-4 text-sm sm:text-base rounded-full',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isMicro = variant === 'micro';
  const baseClasses = `group inline-flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none relative overflow-hidden ${
    isMicro ? 'font-mono' : 'font-sans font-bold'
  } ${VARIANT_STYLES[variant]} ${isMicro ? 'px-3 py-1.5 rounded-lg' : SIZE_STYLES[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const content = (
    <>
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : null}
      <span>{children}</span>
      {withArrow && !isLoading ? (
        <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      ) : null}
    </>
  );

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props as ButtonAsLink;
    const isExternal = href.startsWith('http') || target === '_blank';

    if (isExternal) {
      return (
        <a
          href={href}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={baseClasses}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses} {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type || 'button'}
      disabled={buttonProps.disabled || isLoading}
      className={baseClasses}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
