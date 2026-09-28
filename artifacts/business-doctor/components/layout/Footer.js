import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white"><span className="text-lg font-bold">+</span></span>
            <span className="display text-base font-extrabold">Business Doctor</span>
          </div>
        </div>
        <div>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/services/seo" className="hover:text-white">SEO Services</Link>
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/#faq" className="hover:text-white">Frequently Asked Questions</Link>
            <Link href="/#faq" className="hover:text-white">Get a Free Quote</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-5 text-xs text-white/45 md:px-8">Business Doctor</div>
    </footer>
  );
}