export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const subtleScale = {
  hidden: { opacity: 0, scale: 1.05 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};