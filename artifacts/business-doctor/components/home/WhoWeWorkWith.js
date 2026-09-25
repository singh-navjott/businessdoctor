import SectionHeading from '../shared/SectionHeading';

export default function WhoWeWorkWith() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:items-start">
          <SectionHeading title="Who We Work With" />
          <p className="prose-copy max-w-3xl text-lg">We work with small businesses, startups, and local brands across Delhi NCR — not just large enterprises with big marketing budgets. Whether you&apos;re a local service business trying to rank in your neighbourhood or an e-commerce brand trying to scale on Amazon, our packages are built to be affordable at the small-business level while still being results-focused.</p>
        </div>
      </div>
    </section>
  );
}