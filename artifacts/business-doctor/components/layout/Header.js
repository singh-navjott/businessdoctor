import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 ${scrolled ? 'border-neutral-200 bg-white/90 shadow-sm backdrop-blur' : 'bg-white'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <Link href="/" className="focus-ring flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <span className="text-lg font-bold">+</span>
          </span>
          <span className="display text-base font-extrabold tracking-tight text-primary">Business Doctor</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          <Link href="#services" className="focus-ring text-sm font-medium text-neutral-600 transition-colors hover:text-primary">Services</Link>
          <Link href="#pricing" className="focus-ring text-sm font-medium text-neutral-600 transition-colors hover:text-primary">Pricing</Link>
          <Link href="#faq" className="focus-ring text-sm font-medium text-neutral-600 transition-colors hover:text-primary">FAQs</Link>
          <Button href="#faq">Get a Free Quote</Button>
        </nav>
        <button type="button" aria-label="Toggle navigation menu" aria-expanded={open} onClick={() => setOpen(!open)} className="focus-ring rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-primary md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-neutral-200 bg-white px-4 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link href="#services" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Services</Link>
            <Link href="#pricing" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Pricing</Link>
            <Link href="#faq" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50">FAQs</Link>
            <Button href="#faq" className="mt-2 w-full">Get a Free Quote</Button>
          </div>
        </nav>
      )}
    </header>
  );
}