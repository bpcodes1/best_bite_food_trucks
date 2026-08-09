import { Route, Routes } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { FoodTrucks } from './pages/FoodTrucks';
import { Events } from './pages/Events';
import { JoinThePark } from './pages/JoinThePark';
import { OurStory } from './pages/OurStory';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { ROUTES } from './lib/routes';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.foodTrucks} element={<FoodTrucks />} />
        <Route path={ROUTES.events} element={<Events />} />
        <Route path={ROUTES.joinThePark} element={<JoinThePark />} />
        <Route path={ROUTES.ourStory} element={<OurStory />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
