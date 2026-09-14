// src/pages/HomePage.jsx
// หน้าแรก — รวมทุก section แบบ scroll เหมือนเดิม
import React from 'react';
import HeroSection from '../components/HeroSection';
import MaterialPassport from '../components/MaterialPassport';
import ModularBreakdown from '../components/ModularBreakdown';
import GrandSponsor from '../components/GrandSponsor';
import TeamShowcase from '../components/TeamShowcase';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MaterialPassport />
      <ModularBreakdown />
      <GrandSponsor />
      <TeamShowcase />
    </>
  );
}
