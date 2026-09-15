// src/pages/TeamPage.jsx
// หน้า /team — ทีมงาน แบบเต็มหน้า
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TeamShowcase from '../components/TeamShowcase';

export default function TeamPage() {
  return (
    <>
      {/* ===== Page Hero Banner ===== */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 overflow-hidden bg-gradient-to-b from-champagne/10 via-surface to-surface">
        {/* วงกลมแสงทอง ตกแต่ง */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-champagne/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-azure/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-light text-slateink/50"
          >
            <Link to="/" className="hover:text-azure transition-colors">หน้าหลัก</Link>
            <span>/</span>
            <span className="text-champagne font-medium">ทีมงาน</span>
          </motion.div>

          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-champagne">
              NMTC NOVA TEAM
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slateink">
              เบื้องหลัง <span className="text-azure">RE:BUILD</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-slateink/65">
              ทีมนักออกแบบ วิศวกร และอาจารย์ที่ปรึกษา ที่ร่วมกันพัฒนาแนวคิด
              จนกลายเป็นประติมากรรมใช้งานจริงภายใต้ IMPACT Rise Up Competition
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== เนื้อหาหลัก (ซ่อนหัวข้อซ้ำซ้อน) ===== */}
      <TeamShowcase hideHeader={true} />

      {/* ===== ปุ่มกลับ ===== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-azure hover:text-azure/70 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>
    </>
  );
}
