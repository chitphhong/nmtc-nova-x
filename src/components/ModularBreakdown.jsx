// src/components/ModularBreakdown.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockModules } from '../data/mockdata';

// ไอคอน SVG ประจำแต่ละโมดูล เก็บเป็น object เพื่อเรียกใช้ตาม id
const icons = {
  A: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18v-6a2 2 0 012-2h12a2 2 0 012 2v6" />
      <path d="M4 18h16M7 18v3M17 18v3M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
    </svg>
  ),
  B: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10h14l-1.5 9a2 2 0 01-2 1.7H8.5a2 2 0 01-2-1.7L5 10z" />
      <path d="M12 10c0-3 2-5 5-5-.3 3-2.3 5-5 5zM12 10c0-2.5-1.8-4.5-4.5-4.5.3 2.7 2 4.5 4.5 4.5z" />
    </svg>
  ),
  C: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 14H4l8-14z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  ),
};

export default function ModularBreakdown() {
  // state: รายการโมดูล (เริ่มด้วย mock แล้วค่อยแทนที่ด้วยข้อมูลจาก Supabase)
  const [modules, setModules] = useState(mockModules);
  // state: โมดูลที่ถูกเลือกเพื่อดูรายละเอียดเต็ม
  const [selected, setSelected] = useState(null);

  // ดึงข้อมูลโมดูลจากตาราง modules พร้อม fallback
  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetchWithFallback('modules', mockModules, { order: 'id' });
      if (alive) setModules(res.data);
    })();
    return () => { alive = false; };
  }, []);

  // ตารางแปลง tone → class เพื่อให้ Tailwind สแกนเจอ (ห้ามสร้าง class แบบ string ต่อกัน)
  const toneStyles = {
    azure: { ring: 'hover:border-azure/60 hover:shadow-azure', chip: 'bg-azure/10 text-azure', bar: 'from-azure to-cyanglow' },
    gold: { ring: 'hover:border-champagne/60 hover:shadow-gold', chip: 'bg-champagne/12 text-champagne', bar: 'from-champagne to-amber-300' },
    cyan: { ring: 'hover:border-cyanglow/60 hover:shadow-cyan', chip: 'bg-cyanglow/12 text-cyanglow', bar: 'from-cyanglow to-azure' },
  };

  return (
    <section id="modules" className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-surface to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* หัวข้อ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.36 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyanglow/35 bg-cyanglow/8 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-cyanglow">
            MODULAR SYSTEM
          </span>
          <h2 className="h-fluid mt-4 text-slateink">
            ระบบโมดูล <span className="text-azure">ประกอบ · ถอด · ย้ายได้</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-slateink">
            ประติมากรรมประกอบจาก 3 โมดูลหลัก ที่ออกแบบให้ถอดประกอบซ้ำได้
            ปรับผังตามพื้นที่จัดงาน และซ่อมบำรุงเฉพาะชิ้นได้โดยไม่ต้องรื้อทั้งโครงสร้าง
          </p>
        </motion.div>

        {/* กริดการ์ดโมดูล: 1 คอลัมน์มือถือ → 2 คอลัมน์แท็บเล็ต → 3 คอลัมน์เดสก์ท็อป */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
          {modules.map((mod, i) => {
            const tone = toneStyles[mod.tone] || toneStyles.azure;
            return (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.36, delay: i * 0.084 }}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelected(mod)} // เปิด modal รายละเอียด
                className={`glass-card group relative overflow-hidden border-white/70 p-6 sm:p-7 text-left transition-all duration-200 ${tone.ring}`}
              >
                {/* แถบสีไล่เฉดด้านบนการ์ด */}
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} />

                {/* วงแสงเบลอ ปรากฏตอน hover */}
                <span
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: mod.accent }}
                />

                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.16em] ${tone.chip}`}>
                    {mod.code}
                  </span>
                  {/* ไอคอนประจำโมดูล พร้อมอนิเมชันลอยเบา ๆ เฉพาะโมดูลไฟ */}
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${tone.chip} ${mod.id === 'C' ? 'animate-pulse-slow' : ''}`}
                    style={{ color: mod.accent }}
                  >
                    <span className="h-6 w-6">{icons[mod.id]}</span>
                  </span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-slateink">
                  {mod.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: mod.accent }}>{mod.title_th}</p>

                {/* ตัดข้อความ 3 บรรทัดบนการ์ด แล้วดูเต็มใน modal */}
                <p className="mt-3 text-sm font-light leading-relaxed text-slateink/65 line-clamp-3">
                  {mod.desc}
                </p>

                {/* รายการสเปกย่อย */}
                <ul className="mt-4 space-y-1.5">
                  {mod.specs.map((sp) => (
                    <li key={sp} className="flex items-center gap-2 text-xs font-light text-slateink/60">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: mod.accent }} />
                      {sp}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium transition-transform duration-200 group-hover:translate-x-1" style={{ color: mod.accent }}>
                  ดูรายละเอียด
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ===== Modal รายละเอียดโมดูล ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-slateink/60 px-4 py-8 backdrop-blur-md"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()} // กันคลิกในกล่องแล้วปิด
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 20, stiffness: 400 }}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border bg-white/95 p-6 sm:p-8 backdrop-blur-2xl"
              style={{ borderColor: `${selected.accent}66` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.18em]" style={{ color: selected.accent }}>
                    {selected.code}
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-slateink">{selected.title}</h3>
                  <p className="text-sm font-medium text-black">{selected.title_th}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="ปิดรายละเอียดโมดูล"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-slateink/60 hover:bg-slateink/5"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <p className="mt-5 text-sm sm:text-base font-light leading-relaxed text-black">
                {selected.desc}
              </p>

              {/* ตารางสเปก 1 คอลัมน์มือถือ → 2 คอลัมน์จอกว้าง */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.specs.map((sp) => (
                  <div key={sp} className="rounded-xl border border-slateink/8 bg-slateink/[0.03] p-3">
                    <p className="text-xs font-light text-black">{sp}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelected(null)}
                className="btn-base mt-6 w-full font-semibold text-white"
                style={{ background: selected.accent }}
              >
                ปิด
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
