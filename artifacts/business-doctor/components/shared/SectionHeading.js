export default function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">{title}</h2>
      {intro && <p className="prose-copy mt-5 text-base md:text-lg">{intro}</p>}
    </div>
  );
}