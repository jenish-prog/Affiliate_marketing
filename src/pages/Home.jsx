import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import USPBanner from '../components/USPBanner';
import FlashDeals from '../components/FlashDeals';
import CategoryFilters from '../components/CategoryFilters';
import TrendingOffers from '../components/TrendingOffers';
import FeaturesStrip from '../components/FeaturesStrip';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#F8F9FA]">
      <Navbar />
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <Hero />
        <USPBanner />
        <FlashDeals />
        <CategoryFilters />
        <TrendingOffers />
        <FeaturesStrip />
      </div>
      <Footer />
    </div>
  );
}
