import { Hero } from '../components/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { FoodTrucksTeaser } from '../components/home/FoodTrucksTeaser';
import { FoodsGallery } from '../components/home/FoodsGallery';
import { EventsTeaser } from '../components/home/EventsTeaser';
import { DiningSection } from '../components/home/DiningSection';
import { VendorCtaBand } from '../components/home/VendorCtaBand';
import { VisitSection } from '../components/home/VisitSection';

export function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FoodTrucksTeaser />
      <FoodsGallery />
      <EventsTeaser />
      <DiningSection />
      <VendorCtaBand />
      <VisitSection />
    </>
  );
}
