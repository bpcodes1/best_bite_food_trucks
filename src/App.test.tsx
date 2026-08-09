import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { NAV_ROUTES, ROUTES } from './lib/routes';
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

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    const homeLink = within(nav).getByRole('link', { name: 'Best Bite Food Park' });
    expect(homeLink).toHaveAttribute('href', ROUTES.home);

    for (const route of NAV_ROUTES.filter((r) => r.path !== ROUTES.home)) {
      const label = translations.en.nav[route.key];
      expect(within(nav).getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });

  it('renders the not found page for an unknown route', () => {
    renderApp(['/unknown']);

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });
});
