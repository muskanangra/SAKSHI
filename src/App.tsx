import React, { useState } from 'react';
import { SakshiProvider, useSakshi } from './context/SakshiContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LandingPage } from './components/LandingPage';
import { FeatureStrip } from './components/FeatureStrip';
import { LogoStrip } from './components/LogoStrip';
import { Footer } from './components/Footer';

// 7 Role Portals
import { PortalHeader } from './components/portal/PortalHeader';
import { AuditTrailModal } from './components/portal/AuditTrailModal';
import { DistrictAdminPortal } from './components/portal/DistrictAdminPortal';
import { CentralAdminPortal } from './components/portal/CentralAdminPortal';
import { InvestigatingOfficerPortal } from './components/portal/InvestigatingOfficerPortal';
import { WomensSafetyPortal } from './components/portal/WomensSafetyPortal';
import { EvidenceForensicPortal } from './components/portal/EvidenceForensicPortal';
import { LegalCourtPortal } from './components/portal/LegalCourtPortal';
import { SeniorReviewPortal } from './components/portal/SeniorReviewPortal';

const MainContent: React.FC = () => {
  const { currentRole } = useSakshi();
  const [view, setView] = useState<'landing' | 'login' | 'portal'>('landing');
  const [showAuditModal, setShowAuditModal] = useState(false);

  const handleOpenLogin = () => {
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Portal View if authenticated
  if (view === 'portal') {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-800 antialiased">
        <PortalHeader
          onLogout={handleOpenLanding}
          onOpenAuditLogs={() => setShowAuditModal(true)}
        />

        <main className="flex-1 flex flex-col">
          {currentRole === 'district_admin' && <DistrictAdminPortal />}
          {currentRole === 'central_admin' && <CentralAdminPortal />}
          {currentRole === 'investigating_officer' && <InvestigatingOfficerPortal />}
          {currentRole === 'womens_safety_officer' && <WomensSafetyPortal />}
          {currentRole === 'forensic_officer' && <EvidenceForensicPortal />}
          {currentRole === 'prosecuting_officer' && <LegalCourtPortal />}
          {currentRole === 'senior_officer' && <SeniorReviewPortal />}
        </main>

        <Footer />
        <AuditTrailModal isOpen={showAuditModal} onClose={() => setShowAuditModal(false)} />
      </div>
    );
  }

  // Render Landing & Login Views (Exact Preservation)
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* Official Government Header */}
      <Header currentView={view} onNavigate={(newView) => (newView === 'login' ? handleOpenLogin() : handleOpenLanding())} />

      {/* Main Container with Smooth Animated View Transition */}
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

        {/* Login Page View (Exact Preservation with onLoginSuccess trigger) */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            view === 'login'
              ? 'opacity-100 translate-y-0 block'
              : 'opacity-0 -translate-y-4 hidden pointer-events-none'
          }`}
        >
          <HeroSection onLoginSuccess={handleLoginSuccess} />
        </div>

      </main>

      {/* Feature Strip */}
      <FeatureStrip />

      {/* Logo Strip */}
      <LogoStrip />

      {/* Official Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SakshiProvider>
      <MainContent />
    </SakshiProvider>
  );
};

export default App;
