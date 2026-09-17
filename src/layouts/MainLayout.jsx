// src/layouts/MainLayout.jsx
// Layout กลางที่ครอบทุกหน้า — มี Navbar ด้านบน + เนื้อหา (Outlet) + Footer ด้านล่าง
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  const { pathname } = useLocation();

  // เลื่อนหน้าจอกลับไปบนสุดทันทีเมื่อมีการเปลี่ยนหน้า
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // ให้ขึ้นบนสุดทันที ไม่หน่วง
    });
  }, [pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-surface">
      <Navbar />
      <main>
        {/* Outlet คือพื้นที่แสดงหน้าย่อยตาม route ที่ active */}
        <Outlet />
      </main>
      {/* ซ่อน Footer บนหน้า GrandSponsor เพราะมี full-bleed bg เอง */}
      {pathname !== '/sponsor' && <Footer />}
    </div>
  );
}
