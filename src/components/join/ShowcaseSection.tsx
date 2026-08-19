import { useLanguage } from '../../i18n/useLanguage';
import signPhoto from '../../assets/best_bite_sign.jpg';
import insidePhoto from '../../assets/best_bite_inside.jpeg';
import outdoorPhoto from '../../assets/decoration.jpg';

const PHOTOS = [signPhoto, insidePhoto, outdoorPhoto];

export function ShowcaseSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="showcase-heading"
      className="border-t border-brand-black/10 bg-white px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 id="showcase-heading" className="text-3xl font-bold text-brand-black sm:text-4xl">
            {t.joinPage.showcaseHeading}
          </h2>
          <p className="mt-4 text-brand-black/70">{t.joinPage.showcaseBody}</p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PHOTOS.map((photo) => (
            <li key={photo} className="aspect-[4/3] overflow-hidden rounded-lg">
              <img src={photo} alt="" className="h-full w-full object-cover" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
