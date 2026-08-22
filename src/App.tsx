import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LandingPage } from './components/LandingPage';
import { FeatureStrip } from './components/FeatureStrip';
import { LogoStrip } from './components/LogoStrip';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login'>('landing');

  const handleOpenLogin = () => {
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Official Government Header */}
      <Header currentView={view} onNavigate={(newView) => (newView === 'login' ? handleOpenLogin() : handleOpenLanding())} />

      {/* 2. Interactive Main Section with Smooth Transition */}
      <main className="flex-1 flex flex-col justify-start relative overflow-hidden">
        
        {/* Landing Page View */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            view === 'landing'
              ? 'opacity-100 scale-100 block'
              : 'opacity-0 scale-95 hidden pointer-events-none'
          }`}
        >
          <LandingPage onOpenLogin={handleOpenLogin} />
        </div>

        {/* Login Page View (Preserved exactly as requested with slide-in animation) */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            view === 'login'
              ? 'opacity-100 translate-y-0 block'
              : 'opacity-0 -translate-y-4 hidden pointer-events-none'
          }`}
        >
          <HeroSection />
        </div>

      </main>

      {/* 3. Feature Strip */}
      <FeatureStrip />

      {/* 4. Logo Strip */}
      <LogoStrip />

      {/* 5. Official Footer */}
      <Footer />
    </div>
  );
};

export default App;
