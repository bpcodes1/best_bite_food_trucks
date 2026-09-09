import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { NAV_KEYS, pathFor } from './lib/routes';
import { LanguageProvider } from './i18n/LanguageContext';
import { translations } from './i18n/translations';

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
