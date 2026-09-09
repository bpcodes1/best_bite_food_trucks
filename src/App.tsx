import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { FoodTrucks } from './pages/FoodTrucks';
import { Events } from './pages/Events';
import { JoinThePark } from './pages/JoinThePark';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { NotFound } from './pages/NotFound';
import { LANGS, ROUTE_DEFS } from './lib/routes';
import type { RouteKey } from './lib/routes';

const PAGES: Record<RouteKey, ReactElement> = {
  home: <Home />,
  foodTrucks: <FoodTrucks />,
  events: <Events />,
  joinThePark: <JoinThePark />,
  contact: <Contact />,
  privacyPolicy: <PrivacyPolicy />,
};

// Every page answers at one address per language. The language itself is
// read from the address by LanguageProvider, so the same component renders
// English at /events and Spanish at /es/eventos.
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {ROUTE_DEFS.flatMap((route) =>
          LANGS.map((lang) => (
            <Route
              key={`${route.key}-${lang}`}
              path={route.path[lang]}
              element={PAGES[route.key]}
            />
          )),
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
