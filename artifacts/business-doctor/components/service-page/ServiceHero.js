import Button from '../shared/Button';

export default function ServiceHero({ title, intro }) {
  return (
    <section className="hero-grid bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <h1 className="display max-w-3xl text-4xl font-extrabold leading-tight text-primary md:text-6xl">{title}</h1>
        <p className="prose-copy mt-6 max-w-3xl text-base md:text-lg">{intro}</p>
        <div className="mt-8"><Button href="#faq">Get a Free Quote</Button></div>
      </div>
    </section>
  );
}