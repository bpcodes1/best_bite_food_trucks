import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { NAV_KEYS, pathFor } from './lib/routes';
import { LanguageProvider } from './i18n/LanguageContext';
import { translations } from './i18n/translations';
import { trucks } from './data/trucks';
import { isOpenAt } from './lib/hours';

function renderApp(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
}

describe('App', () => {
  it('renders the home page at /', () => {
    renderApp(['/']);

    expect(screen.getByRole('heading', { name: 'Best Bite Food Park' })).toBeInTheDocument();
  });

  it('renders a home logo link and a nav link for every other page', () => {
    renderApp(['/']);

    const nav = screen.getByRole('navigation', { name: translations.en.nav.primaryLabel });
    const homeLink = within(nav).getByRole('link', { name: 'Best Bite Food Park' });
    expect(homeLink).toHaveAttribute('href', pathFor('home', 'en'));

    for (const key of NAV_KEYS.filter((k) => k !== 'home')) {
      const label = translations.en.nav[key];
      expect(within(nav).getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });

  it('renders the not found page for an unknown route', () => {
    renderApp(['/unknown']);

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });
});

describe('Spanish addresses', () => {
  it('reads the language from the address and sets it on the document', () => {
    renderApp(['/es']);

    expect(document.documentElement.lang).toBe('es');
  });

  it('renders Spanish nav labels pointing at Spanish addresses', () => {
    renderApp(['/es']);

    // The landmark name itself is translated, so looking it up by the Spanish
    // string is also the assertion that it was not left in English.
    const nav = screen.getByRole('navigation', { name: translations.es.nav.primaryLabel });
    for (const key of NAV_KEYS.filter((k) => k !== 'home')) {
      const links = within(nav).getAllByRole('link', { name: translations.es.nav[key] });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute('href', pathFor(key, 'es'));
      }
    }
  });

  it('links the language toggle to the same page in the other language', () => {
    renderApp(['/events']);
    for (const toggle of screen.getAllByRole('link', { name: /Switch to Spanish/ })) {
      expect(toggle).toHaveAttribute('href', '/es/eventos');
    }
  });

  it('links the toggle back to English from a Spanish address', () => {
    renderApp(['/es/eventos']);
    for (const toggle of screen.getAllByRole('link', { name: /Switch to English/ })) {
      expect(toggle).toHaveAttribute('href', '/events');
    }
  });

  it('renders the Spanish not found page under /es', () => {
    renderApp(['/es/no-existe']);

    expect(
      screen.getByRole('heading', { name: translations.es.notFoundPage.heading }),
    ).toBeInTheDocument();
  });

  it('sends the toggle to the other home when the address matches no page', () => {
    renderApp(['/es/no-existe']);
    for (const toggle of screen.getAllByRole('link', { name: /Switch to English/ })) {
      expect(toggle).toHaveAttribute('href', '/');
    }
  });
});

describe('open/closed badge', () => {
  const syrianHouse = trucks.find((t) => t.id === 'syrian-house');
  // 11am-2pm and 5pm-9pm, every day.
  const LUNCH_OPEN = 11 * 60;
  const LUNCH_CLOSE = 14 * 60;
  const DINNER_OPEN = 17 * 60;
  const DINNER_CLOSE = 21 * 60;

  it('reports a split-shift vendor open during BOTH services', () => {
    for (let day = 0; day <= 6; day += 1) {
      expect(isOpenAt(syrianHouse?.hoursByDay, day, LUNCH_OPEN + 30)).toBe(true);
      expect(isOpenAt(syrianHouse?.hoursByDay, day, DINNER_OPEN + 30)).toBe(true);
    }
  });

  // The regression this whole shape change exists for. Before 2026-09-09 the
  // day held one pair, so this vendor read as closed right through dinner.
  it('reports it CLOSED in the gap between lunch and dinner', () => {
    expect(isOpenAt(syrianHouse?.hoursByDay, 3, 15 * 60)).toBe(false);
  });

  it('treats the closing minute as shut and the opening minute as open', () => {
    expect(isOpenAt(syrianHouse?.hoursByDay, 3, LUNCH_CLOSE)).toBe(false);
    expect(isOpenAt(syrianHouse?.hoursByDay, 3, LUNCH_OPEN)).toBe(true);
    expect(isOpenAt(syrianHouse?.hoursByDay, 3, DINNER_CLOSE)).toBe(false);
  });

  it('reports closed on a day the vendor does not trade, and when hours are unknown', () => {
    const redMarino = trucks.find((t) => t.id === 'the-red-marino');
    expect(isOpenAt(redMarino?.hoursByDay, 1, 13 * 60)).toBe(false); // Mon: closed
    expect(isOpenAt(redMarino?.hoursByDay, 3, 13 * 60)).toBe(true); // Wed: open
    expect(isOpenAt(undefined, 3, 13 * 60)).toBe(false);
  });

  it('keeps every vendor to windows that open before they close', () => {
    for (const truck of trucks) {
      for (const windows of Object.values(truck.hoursByDay ?? {})) {
        for (const [opens, closes] of windows) {
          expect(opens).toBeLessThan(closes);
        }
      }
    }
  });
});
