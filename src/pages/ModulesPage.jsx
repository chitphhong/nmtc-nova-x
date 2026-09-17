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
      <section className="relative pt-32 pb-6 sm:pt-36 sm:pb-8 overflow-hidden bg-gradient-to-b from-cyanglow/8 to-surface">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyanglow/35 bg-cyanglow/8 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-cyanglow">
              MODULAR SYSTEM
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slateink">
              ระบบโมดูล <br />
              <span className="text-azure">ประกอบ · ถอด · ย้ายได้</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-slateink/65">
              "นวัตกรรมโครงสร้างระบบถอดประกอบอัจฉริยะ (Adaptive Modular Architecture)"

ประติมากรรม IMPACT RE:BUILD ถูกรังสรรค์ขึ้นจาก 4 โมดูลหลักที่เชื่อมต่อกันด้วยระบบวิศวกรรมแบบถอดประกอบซ้ำได้ (Re-configurable Dynamic System) เอื้อต่อการปรับเปลี่ยนผังรูปทรงให้เข้ากับบริบทพื้นที่จัดแสดงสินค้าและการประชุมของอิมแพ็ค เมืองทองธานีได้อย่างไร้ขีดจำกัด อีกทั้งยังรองรับการซ่อมบำรุงเฉพาะโมดูล (Selective Maintenance) ได้อย่างแม่นยำ โดยไม่รบกวนหรือรื้อถอนโครงสร้างหลักทั้งหมด ยืดอายุการใช้งาน ชูแนวคิด Circular Design และลดการสร้างขยะส่วนเกินได้อย่างเป็นรูปธรรม
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== เนื้อหาหลัก: ซ่อนหัวข้อเพื่อไม่ให้ซ้ำ ===== */}
      <ModularBreakdown hideHeader={true} />

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
