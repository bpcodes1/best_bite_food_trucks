import { useLanguage } from '../../i18n/useLanguage';
import seatingArea from '../../assets/seating_area.jpg';
import parkView2 from '../../assets/park_view2.jpg';
import crowd from '../../assets/crowd.jpg';
import decoration from '../../assets/decoration.jpg';

const IMAGES = [seatingArea, parkView2, crowd, decoration];

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="benefits-heading" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="benefits-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
        {t.joinPage.benefitsHeading}
      </h2>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {t.joinPage.benefits.map((benefit, index) => (
          <li
            key={benefit.title}
            className="overflow-hidden rounded-lg border border-brand-black/10"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={IMAGES[index]}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-lg font-bold text-brand-black">{benefit.title}</h3>
              <p className="mt-1 text-sm text-brand-black/70">{benefit.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
