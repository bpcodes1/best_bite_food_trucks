import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * The small shared primitives. Anything used by exactly one page stays in that
 * page's file — this is only for what genuinely repeats across addresses.
 *
 * Every value here references a token from src/index.css. No inline colours,
 * no arbitrary hex. See design.md.
 */

type Ground = 'cream' | 'night'

const GROUND: Record<Ground, string> = {
  cream: 'bg-paper text-ink',
  night: 'bg-night text-paper',
}

/**
 * Section padding is deliberately NOT uniform across the page — equal padding
 * everywhere is the templated tell design.md calls out. Callers pass their own
 * vertical rhythm; this only owns the ground and the gutter.
 */
export function Section({
  ground = 'cream',
  className = '',
  id,
  children,
}: {
  ground?: Ground
  className?: string
  id?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`${GROUND[ground]} px-5 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

/** Eyebrow / kicker. Mono, uppercase, letterspaced — the label role. */
export function Label({
  children,
  tone = 'ink',
}: {
  children: ReactNode
  tone?: 'ink' | 'night' | 'accent'
}) {
  const color =
    tone === 'night' ? 'text-night-muted' : tone === 'accent' ? 'text-brand-black' : 'text-muted'
  return <p className={`font-mono text-xs uppercase tracking-[0.14em] ${color}`}>{children}</p>
}

/** Outlined, never filled — per design.md. Carries specs, cuisine, hours. */
export function Chip({ children, tone = 'ink' }: { children: ReactNode; tone?: 'ink' | 'night' }) {
  const border = tone === 'night' ? 'border-night-muted/50 text-paper' : 'border-rule text-ink'
  return (
    <span
      className={`inline-block border ${border} px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]`}
    >
      {children}
    </span>
  )
}

/**
 * Buttons name the action AND its outcome — never "Next" or "Submit".
 *
 * Three renderings from one skin: `to` for an internal page (react-router
 * Link — a raw anchor would force a full reload and drop out of the SPA),
 * `as="a"` + `href` for in-page jumps and external URLs, and the default
 * button for forms.
 */
export function Button({
  as = 'button',
  href,
  to,
  variant = 'solid',
  type,
  children,
}: {
  as?: 'button' | 'a'
  href?: string
  to?: string
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit'
  children: ReactNode
}) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] ' +
    'transition-[background-color,color,border-color,transform] duration-150 ease-out ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ' +
    'active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50'

  const skin =
    variant === 'solid'
      ? 'bg-brand-yellow text-brand-black hover:bg-ink hover:text-brand-yellow'
      : 'border border-current text-ink hover:bg-ink hover:text-paper'

  if (to) {
    return (
      <Link to={to} className={`${base} ${skin}`}>
        {children}
      </Link>
    )
  }
  if (as === 'a') {
    return (
      <a href={href} className={`${base} ${skin}`}>
        {children}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} className={`${base} ${skin}`}>
      {children}
    </button>
  )
}

/**
 * The text-input skin, shared by the Únete and Contact forms. One string so
 * the two forms cannot drift apart visually.
 */
export const field =
  'mt-1.5 w-full border border-rule bg-transparent px-3 py-2.5 text-ink ' +
  'placeholder:text-muted/70 focus:border-ink focus:outline-none'

/** The mono uppercase skin form labels share with the Label component. */
export const fieldLabel = 'font-mono text-[11px] tracking-[0.12em] uppercase'
