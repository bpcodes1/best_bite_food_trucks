import { useLanguage } from '../i18n/useLanguage';
import type { Truck } from '../data/trucks';

interface TruckCardProps {
  truck: Truck;
}

export function TruckCard({ truck }: TruckCardProps) {
  const { lang } = useLanguage();

  return (
    <li className="flex flex-col overflow-hidden rounded-lg border border-brand-black/10 bg-white">
      <div className="aspect-[4/3] w-full bg-brand-yellow/15">
        {truck.image ? (
          <img
            src={truck.image}
            alt={truck.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-4xl"
            role="img"
            aria-label={truck.name}
          >
            🚚
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center gap-3 p-4">
        {truck.logo && (
          <img
            src={truck.logo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-full border border-brand-black/10 object-cover"
          />
        )}
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="font-heading text-lg font-bold text-brand-black">{truck.name}</h3>
          <span className="inline-block w-fit rounded-full bg-brand-yellow/15 px-2.5 py-0.5 text-xs font-bold text-brand-black/80">
            {truck.foodType[lang]}
          </span>
          <p className="mt-auto pt-2 text-sm text-brand-black/60">{truck.hours[lang]}</p>
        </div>
      </div>
    </li>
  );
}
