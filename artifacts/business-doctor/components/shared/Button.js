import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({ href = '#faq', children, variant = 'primary', className = '' }) {
  const styles = variant === 'secondary'
    ? 'border border-primary/20 bg-white text-primary hover:border-primary/40'
    : 'bg-accent text-white hover:bg-accent-hover';
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link href={href} className={`focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${styles} ${className}`}>
        {children}
        <span aria-hidden="true" className="ml-3 text-base">↗</span>
      </Link>
    </motion.div>
  );
}