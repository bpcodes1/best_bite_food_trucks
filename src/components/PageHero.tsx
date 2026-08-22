import heroImage from '../assets/best_bite_inside.jpeg';

interface PageHeroProps {
  heading: string;
  intro?: string;
  /** Hides the intro paragraph on mobile (shown again at sm: and up). */
  hideIntroOnMobile?: boolean;
  /** Small uppercase label shown above the heading, e.g. "Lease a space · Salem, OR". */
  eyebrow?: string;
  cta?: { label: string; href: string };
  /** Small supporting line shown under the CTA button, e.g. "4 questions · 2 minutes". */
  ctaMicrocopy?: string;
}

export function PageHero({
  heading,
  intro,
  hideIntroOnMobile,
  eyebrow,
  cta,
  ctaMicrocopy,
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-72 items-end overflow-hidden sm:min-h-96">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent" />

      <div className="relative w-full px-4 py-8 sm:px-8 sm:py-10 lg:px-16">
        {eyebrow && (
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-yellow">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-heading text-2xl font-bold text-white sm:text-4xl">{heading}</h1>
        {intro && (
          <p
            className={`mt-2 max-w-2xl text-white/80 ${hideIntroOnMobile ? 'hidden sm:block' : ''}`}
          >
            {intro}
          </p>
        )}

        {cta && (
          <div className="mt-6 flex flex-col items-start gap-2">
            <a
              href={cta.href}
              className="rounded-sm bg-brand-yellow px-[22px] py-[11px] text-center font-heading text-sm font-semibold text-brand-black transition-colors hover:bg-brand-yellow-dark"
            >
              {cta.label}
            </a>
            {ctaMicrocopy && <p className="text-sm text-white/70">{ctaMicrocopy}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
