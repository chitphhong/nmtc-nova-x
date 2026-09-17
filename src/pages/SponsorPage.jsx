// src/pages/SponsorPage.jsx
// หน้า /sponsor — ผู้สนับสนุนหลัก แบบเต็มหน้า
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GrandSponsor from '../components/GrandSponsor';
import Footer from '../components/Footer';

export default function SponsorPage() {
  return (
    <>
      {/* ===== Breadcrumb (ลอยอยู่บน full-bleed hero ของ GrandSponsor) ===== */}
      {/* <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-light text-white/70"
        >
          <Link to="/" className="hover:text-champagne transition-colors">หน้าหลัก</Link>
          <span>/</span>
          <span className="text-champagne font-medium">ผู้สนับสนุน</span>
        </motion.div>
      </div> */}

      {/* ===== GrandSponsor เต็มหน้า (มี bg ของตัวเอง) ===== */}<Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-champagne transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            กลับหน้าหลัก
          </Link>
      <GrandSponsor />

      {/* ===== ปุ่มกลับ + Footer ===== */}
      <div className="bg-slateink px-4 sm:px-8 lg:px-16 py-8">
        <div className="mx-auto max-w-7xl">
          
        </div>
      </div>
      <Footer />
    </>
  );
}
