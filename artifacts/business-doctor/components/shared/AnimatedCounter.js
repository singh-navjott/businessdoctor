import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const numericValue = Number(value);

  useEffect(() => {
    if (!isInView) return;
    const started = performance.now();
    const duration = 1100;
    let frame;
    const tick = (time) => {
      const progress = Math.min((time - started) / duration, 1);
      setCount(numericValue * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericValue]);

  const formatted = numericValue % 1 ? count.toFixed(2) : Math.round(count).toLocaleString('en-IN');
  return <motion.span ref={ref} aria-label={`${prefix}${value}${suffix}`}>{prefix}{formatted}{suffix}</motion.span>;
}