// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MaterialPassport from './components/MaterialPassport';
import ModularBreakdown from './components/ModularBreakdown';
import GrandSponsor from './components/GrandSponsor';
import TeamShowcase from './components/TeamShowcase';
import Footer from './components/Footer';

// คอมโพเนนต์หลัก ทำหน้าที่ประกอบทุก section เข้าด้วยกันตามลำดับหน้า
export default function App() {
  return (
    // overflow-x-hidden กันการเลื่อนแนวนอนบนมือถือเด็ดขาด
    <div className="min-h-screen w-full overflow-x-hidden bg-surface">
      <Navbar />
      <main>
        <HeroSection />
        <MaterialPassport />
        <ModularBreakdown />
        <GrandSponsor />
        <TeamShowcase />
      </main>
      <Footer />
    </div>
  );
}
