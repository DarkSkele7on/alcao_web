"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  duration?: number;
};

export default function AnimatedCounter({ value, duration = 2000 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericMatch = value.match(/^([\d.]+)/);
          if (!numericMatch) {
            setDisplayValue(value);
            return;
          }
          const target = parseFloat(numericMatch[1]);
          const suffix = value.slice(numericMatch[1].length);
          const isFloat = numericMatch[1].includes(".");
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = target * eased;

            if (isFloat) {
              setDisplayValue(current.toFixed(1) + suffix);
            } else {
              setDisplayValue(Math.floor(current).toString() + suffix);
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{displayValue}</span>;
}
