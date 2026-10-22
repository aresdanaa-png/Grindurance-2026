'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  requiredIndicator?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, requiredIndicator = false, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-300"
          >
            {label}
            {requiredIndicator && <span className="text-[#FA6D0B] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0B0C0E] border text-sm text-white placeholder-slate-500 font-sans transition-all duration-200 outline-none ${
            error
              ? 'border-white/60 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B]'
              : 'border-white/10 focus:border-[#FA6D0B] focus:ring-1 focus:ring-[#FA6D0B]'
          } disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[10px] font-mono text-white/90 uppercase tracking-wider mt-1 flex items-center gap-1">
            <span className="text-[#FA6D0B] font-bold">// PERINGATAN:</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-[10px] font-sans text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
