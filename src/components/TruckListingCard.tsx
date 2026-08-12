interface TruckListingCardProps {
  imageUrl: string;
  name: string;
  hours: string;
}

/**
 * Photo-forward truck card: the full original-ratio photo, with a frosted
 * blur over its bottom fifth carrying the truck name (left) and hours (right).
 */
export function TruckListingCard({ imageUrl, name, hours }: TruckListingCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative aspect-[4/3] w-full">
        <img src={imageUrl} alt={name} className="absolute inset-0 h-full w-full object-cover" />

        <div className="absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-between gap-2 bg-brand-black/25 p-3 backdrop-blur-md">
          <h3 className="truncate font-heading text-sm font-bold leading-tight text-white">
            {name}
          </h3>
          <span className="shrink-0 truncate rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white">
            🕒 {hours}
          </span>
        </div>
      </div>
    </div>
  );
}
