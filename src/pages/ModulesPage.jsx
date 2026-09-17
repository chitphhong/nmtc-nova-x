// src/pages/ModulesPage.jsx
// หน้า /modules — โมดูลโครงสร้าง แบบเต็มหน้า
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModularBreakdown from '../components/ModularBreakdown';

export default function ModulesPage() {
  return (
    <>
      {/* ===== Page Hero Banner ===== */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-gradient-to-b from-cyanglow/8 to-surface">
        {/* ลายกริดพื้นหลัง */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

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
            <span className="text-cyanglow font-medium">โมดูลโครงสร้าง</span>
          </motion.div>

          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 max-w-3xl"
          >
            
          </motion.div>
        </div>
      </section>

      {/* ===== เนื้อหาหลัก ===== */}
      <ModularBreakdown />

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
