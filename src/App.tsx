import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureStrip } from './components/FeatureStrip';
import { LogoStrip } from './components/LogoStrip';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Header (white background, thin orange-to-green gradient bottom border, ~90px height) */}
      <Header />

      {/* 2. Hero Section (two-column split, full width, min-height ~700px) */}
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
      </main>

      {/* 3. Feature Strip (below hero, white background, full width, py-10) */}
      <FeatureStrip />

      {/* 4. Logo Strip (light gray/white background, centered row, py-6) */}
      <LogoStrip />

      {/* 5. Footer (dark navy background #0F2A4A, white text, full width, py-8) */}
      <Footer />
    </div>
  );
};

export default App;
