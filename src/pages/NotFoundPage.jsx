// src/pages/NotFoundPage.jsx
// หน้า 404 — สไตล์ตาม design system ของโครงการ
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface px-4">
      {/* วงแสงตกแต่ง */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-azure/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-champagne/10 blur-3xl" />

      <div className="relative z-10 text-center">
        {/* ตัวเลข 404 ขนาดใหญ่ */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[120px] sm:text-[180px] font-bold leading-none tracking-tight text-azure/15 select-none"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="-mt-8 sm:-mt-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/8 px-4 py-1.5 text-xs font-medium tracking-wider text-azure">
            PAGE NOT FOUND
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slateink">
            ไม่พบหน้านี้
          </h1>
          <p className="mt-3 text-sm sm:text-base font-light text-slateink/60 max-w-sm mx-auto">
            หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือไม่มีอยู่แล้ว
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-base bg-azure text-white font-semibold hover:brightness-110 hover:scale-[1.02]"
            >
              กลับหน้าหลัก
            </Link>
            <Link
              to="/team"
              className="btn-base border border-azure/40 bg-white text-azure hover:bg-azure/5 hover:scale-[1.02]"
            >
              ดูทีมงาน
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
