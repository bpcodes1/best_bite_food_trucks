import '@testing-library/jest-dom/vitest';

// jsdom implements neither of these. Components call them in effects
// (PastEventsGallery reads matchMedia for its breakpoints, ScrollToTop calls
// scrollTo on navigation), and without stubs any test that mounts the Events
// page throws before the assertions run.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

window.scrollTo = () => {};
