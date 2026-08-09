interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-brand-black/70">{description}</p>
    </section>
  );
}
