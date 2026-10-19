'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'fade';
}

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already within viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (delayMs > 0) {
        const timer = setTimeout(() => setIsRevealed(true), delayMs);
        return () => clearTimeout(timer);
      } else {
        setIsRevealed(true);
        return;
      }
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => setIsRevealed(true), delayMs);
            } else {
              setIsRevealed(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '80px 0px 40px 0px' }
    );

    observer.observe(el);

    // Bulletproof fallback: ensure element is revealed even on edge-case scroll jumps
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [delayMs]);

  const directionClasses = 
    direction === 'fade' ? 'reveal-fade' : 
    direction === 'down' ? 'reveal-down' : 
    'reveal-on-scroll';

  return (
    <div
      ref={ref}
      className={`${directionClasses} ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
