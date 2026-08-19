import heroImage from '../assets/best_bite_inside.jpeg';

interface PageHeroProps {
  heading: string;
  intro?: string;
}

export function PageHero({ heading, intro }: PageHeroProps) {
  return (
    <section className="relative isolate flex h-56 items-end overflow-hidden sm:h-72">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent" />

      <div className="relative w-full px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{heading}</h1>
        {intro && <p className="mt-2 max-w-2xl text-white/80">{intro}</p>}
      </div>
    </section>
  );
}
