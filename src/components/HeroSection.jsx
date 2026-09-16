// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { lightingModes } from '../data/mockdata';
import ImpactModelViewer from './ImpactModelViewer';

export default function HeroSection() {
  // state: โหมดแสงที่ผู้ใช้เลือกอยู่ (standby / approach / active / photo)
  const [mode, setMode] = useState(lightingModes[0]);

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* ===== ภาพพื้นหลังเต็มจอ ===== */}
      <div className="absolute inset-0">
        <img
          src="/conceptcrop.jpg"
          alt="ประติมากรรม IMPACT RE:BUILD ขนาด 3 x 2 x 2 เมตร"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* เลเยอร์ไล่เฉดเข้ม ช่วยให้ตัวอักษรอ่านง่ายบนทุกจอ */}
        <div className="absolute inset-0 bg-gradient-to-b from-slateink/85 via-slateink/60 to-slateink/90" />
        {/* เลเยอร์แสงตามโหมดที่เลือก — เปลี่ยนสี/ความสว่างแบบนุ่มนวล */}
        <motion.div
          animate={{ opacity: mode.brightness / 260 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 mix-blend-screen"
          style={{ background: `radial-gradient(circle at 50% 55%, ${mode.color}, transparent 62%)` }}
        />
      </div>

      {/* ===== เนื้อหา Hero ===== */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 sm:px-8 lg:px-16 pt-24 pb-16 sm:pt-28">
        {/* แบดจ์ชื่อการแข่งขัน */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-champagne/60 bg-champagne/10 px-3 sm:px-4 py-2 backdrop-blur-md shadow-gold"
        >
          {/* จุดกระพริบสื่อถึงสถานะ live */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium tracking-wider text-champagne">
            IMPACT Rise Up
          </span>
        </motion.div>

        {/* หัวข้อหลักภาษาไทย */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-5 sm:mt-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight text-white"
        >
          FROM WASTE{' '}
          {/* ไล่เฉดทอง→ไซแอนบนคำสำคัญ */} <br />
          <span className="bg-gradient-to-r from-champagne via-champagne to-cyanglow bg-clip-text text-transparent">
            TO WONDER
          </span>
        </motion.h1>

        {/* Tagline ภาษาอังกฤษ */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-4 text-sm sm:text-base md:text-lg font-light tracking-[0.28em] text-white/70"
        >
          หมดหน้าที่ แต่ไม่หมดคุณค่า
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-4 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-white/75"
        >
          ประติมากรรมที่ใช้งานได้จริง สร้างจากขยะพลาสติกภายในงานอีเวนต์
          แปรรูปเป็นแผ่นเทอราซโซโมดูลาร์ พร้อมระบบไฟอัจฉริยะและพื้นที่สีเขียว
        </motion.p>

        {/* ===== Interactive Viewport: Hotspot มิติ + โหมดแสง ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44 }}
          className="mt-8 sm:mt-10 w-full max-w-5xl glass-dark border-white/20 p-4 sm:p-5"
        >
          {/* โมเดลจริงจาก SketchUp: ลากเพื่อหมุน และหมุนล้อเมาส์เพื่อซูม */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-slateink/30">
            {/* กริดพื้นหลังสไตล์ blueprint */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(6,182,212,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,.25) 1px,transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <ImpactModelViewer mode={mode} className="absolute inset-0 grid place-items-center" />
            {/* ป้ายสรุปมิติรวมมุมล่างซ้าย */}
            <div className="absolute bottom-3 left-3 rounded-lg border border-white/20 bg-slateink/60 px-3 py-1.5 backdrop-blur">
              <span className="text-[11px] sm:text-xs font-light tracking-wider text-white/85">
                3.00 m × 1.80 m × 2.00 m
              </span>
            </div>
          </div>

          {/* ปุ่มสลับโหมดแสง — 2 คอลัมน์บนมือถือ, 4 คอลัมน์ตั้งแต่ sm ขึ้นไป */}
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-light tracking-[0.18em] text-white/55">
              LIGHTING MOOD · โหมดแสง
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {lightingModes.map((m) => {
                const active = mode.key === m.key; // เช็คว่าโหมดนี้ถูกเลือกอยู่ไหม
                return (
                  <button
                    key={m.key}
                    onClick={() => setMode(m)}
                    className={`min-h-[44px] rounded-xl border px-2 py-2 text-[11px] sm:text-xs font-medium transition-all duration-300 active:scale-95 ${
                      active
                        ? 'border-champagne bg-champagne/15 text-champagne shadow-gold'
                        : 'border-white/20 bg-white/5 text-white/65 hover:border-cyanglow/50 hover:text-white'
                    }`}
                  >
                    <span className="block">{m.label}</span>
                    <span className="block text-[10px] font-light opacity-70">{m.label_th}</span>
                  </button>
                );
              })}
            </div>
            {/* คำอธิบายโหมดที่เลือก — เปลี่ยนข้อความแบบ fade */}
            <motion.p
              key={mode.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-[11px] sm:text-xs font-light text-white/60"
            >
              ความสว่าง {mode.brightness}% — {mode.desc}
            </motion.p>
          </div>
        </motion.div>

        {/* ===== ปุ่ม CTA หลัก ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a href="#modules" className="btn-base bg-champagne text-slateink font-semibold shadow-gold hover:brightness-110 hover:scale-[1.02]">
            สำรวจโครงสร้าง
          </a>
          <a href="#passport" className="btn-base border border-cyanglow/60 bg-white/10 text-white backdrop-blur hover:bg-cyanglow/15 hover:scale-[1.02]">
            ที่มาวัสดุและการรีไซเคิล
          </a>
        </motion.div>
      </div>

      {/* ตัวบอกให้เลื่อนลง — ซ่อนบนมือถือเพื่อประหยัดพื้นที่ */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2">
          <span className="h-2 w-1 rounded-full bg-champagne" />
        </div>
      </motion.div>
    </section>
  );
}
