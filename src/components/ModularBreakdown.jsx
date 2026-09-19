// src/components/ModularBreakdown.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockModules } from '../data/mockdata';
import ModulePrintModal from './ModulePrintModal';

export default function ModularBreakdown({ hideHeader = false }) {
  // state: รายการโมดูล
  const [modules, setModules] = useState(mockModules);
  // state: โมดูลที่ถูกเลือกเพื่อดูรายละเอียดแบบย่อ
  const [selected, setSelected] = useState(null);
  // state: หมวดหมู่ที่เลือกฟิลเตอร์
  const [activeCategory, setActiveCategory] = useState('all');
  // state: เปิดโมดอลพิมพ์ QR Code
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // ดึงข้อมูลโมดูลจากตาราง modules พร้อม fallback
  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetchWithFallback('modules', mockModules, { order: 'id' });
      if (alive) {
        setModules(res.data && res.data.length > 0 ? res.data : mockModules);
      }
    })();
    return () => { alive = false; };
  }, []);

  // หมวดหมู่ทั้งหมด
  const categories = [
    { key: 'all', label: `ทั้งหมด (${modules.length})` },
    { key: 'Cube System', label: 'Cube System' },
    { key: 'Compact Cube', label: 'Compact (55cm)' },
    { key: 'Triangular System', label: 'Triangle' },
    { key: 'พืชพันธุ์ & แสงไฟ', label: 'พืชพันธุ์ & แสงไฟ' },
  ];

  // กรองตามหมวดหมู่
  const filteredModules = modules.filter((m) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'พืชพันธุ์ & แสงไฟ') {
      return (
        m.category === 'พืชพันธุ์ & แสงไฟ' ||
        m.category === 'Special' ||
        m.category === 'Biophilic System' ||
        m.category === 'Smart Electrical' ||
        m.category === 'Geometric Accent' ||
        m.code === 'Plants' ||
        m.code === 'Lighting' ||
        m.code === 'Hexagon'
      );
    }
    return m.category === activeCategory || m.category_th === activeCategory;
  });

  const toneStyles = {
    azure: { ring: 'hover:border-azure/60 hover:shadow-azure', chip: 'bg-azure/10 text-azure border-azure/25', bar: 'from-azure to-cyanglow' },
    gold: { ring: 'hover:border-champagne/60 hover:shadow-gold', chip: 'bg-champagne/12 text-champagne border-champagne/25', bar: 'from-champagne to-amber-300' },
    cyan: { ring: 'hover:border-cyanglow/60 hover:shadow-cyan', chip: 'bg-cyanglow/12 text-cyanglow border-cyanglow/25', bar: 'from-cyanglow to-azure' },
  };

  return (
    <section id="modules" className={`relative ${hideHeader ? 'pt-4 pb-16 sm:pt-6 sm:pb-20' : 'py-16 sm:py-20 lg:py-28'} bg-gradient-to-b from-surface to-white`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* หัวข้อ Section (ซ่อนเมื่อเปิดจากหน้า ModulesPage) */}
        {!hideHeader && (
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
              ระบบโมดูล <br /><span className="text-azure">ประกอบ · ถอด · ย้ายได้</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-slateink">
              "นวัตกรรมโครงสร้างระบบถอดประกอบอัจฉริยะ (Adaptive Modular Architecture)"
              ประติมากรรม IMPACT RE:BUILD ถูกรังสรรค์ขึ้นจากโมดูลย่อยที่เชื่อมต่อกันด้วยระบบวิศวกรรมแบบถอดประกอบซ้ำได้ (Re-configurable Dynamic System) เอื้อต่อการปรับเปลี่ยนผังรูปทรงให้เข้ากับบริบทพื้นที่จัดแสดงสินค้า พร้อมระบบ QR Code ประจำชิ้นงานเพื่อติดตามและดูประวัติวัสดุได้อย่างโปร่งใส
            </p>
          </motion.div>
        )}

        {/* ── Action Bar: ปุ่มพิมพ์ QR Code + หมวดหมู่ ── */}
        <div className={`${hideHeader ? 'mt-4' : 'mt-10'} flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slateink/10 pb-6`}>
          {/* หมวดหมู่ Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-azure text-white shadow-sm'
                    : 'bg-slateink/5 text-slateink/70 hover:bg-slateink/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ปุ่มพิมพ์แผ่น QR Code ทั้งหมด */}
          <button
            type="button"
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/10 px-4 py-2 text-xs sm:text-sm font-semibold text-azure hover:bg-azure hover:text-white transition-all shadow-sm shrink-0 self-start sm:self-auto"
          >
            <span>🖨️</span>
            <span>พิมพ์แผ่น QR Code ({modules.length} ชิ้น)</span>
          </button>
        </div>

        {/* ── กริดการ์ดโมดูล ── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredModules.map((mod, i) => {
            const tone = toneStyles[mod.tone] || toneStyles.azure;
            return (
              <motion.div
                key={mod.code}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -6 }}
                className={`glass-card group relative flex flex-col justify-between overflow-hidden border-white/70 p-6 sm:p-7 transition-all duration-200 ${tone.ring}`}
              >
                {/* แถบสีไล่เฉดด้านบนการ์ด */}
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} />

                <div>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider ${tone.chip}`}>
                      MODULE {mod.code}
                    </span>
                    <span className="text-xs text-slateink/50 font-light">
                      {mod.category_th || mod.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-slateink">
                    {mod.title_th || mod.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm font-light leading-relaxed text-slateink/65 line-clamp-3">
                    {mod.desc}
                  </p>

                  {/* สเปกย่อย */}
                  {mod.specs && (
                    <ul className="mt-4 space-y-1.5 border-t border-slateink/5 pt-3">
                      {mod.specs.slice(0, 2).map((sp) => (
                        <li key={sp} className="flex items-center gap-2 text-xs font-light text-slateink/60">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: mod.accent }} />
                          <span className="line-clamp-1">{sp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ชิ้นส่วนสรุป */}
                  {mod.components && (
                    <div className="mt-3 text-[11px] font-medium text-azure">
                      ชิ้นส่วน: {mod.components.length} รายการ
                    </div>
                  )}
                </div>

                {/* ปุ่มดูรายละเอียด & สแกน QR */}
                <div className="mt-6 flex items-center justify-between border-t border-slateink/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelected(mod)}
                    className="text-xs font-medium text-slateink/60 hover:text-slateink transition-colors"
                  >
                    ดูสรุปย่อ
                  </button>

                  <Link
                    to={`/modules/${mod.code}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-azure group-hover:translate-x-1 transition-all"
                  >
                    <span>หน้ารายละเอียด & QR</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Modal สรุปย่อโมดูล ── */}
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
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl border bg-white p-6 sm:p-8 shadow-2xl"
              style={{ borderColor: `${selected.accent}66` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: selected.accent }}>
                    MODULE {selected.code}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-slateink">{selected.title_th || selected.title}</h3>
                  <p className="text-xs text-slateink/60 mt-0.5">{selected.category_th || selected.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slateink/5 text-slateink/60 hover:bg-slateink/10"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-sm font-light leading-relaxed text-slateink/80">
                {selected.desc}
              </p>

              {/* สเปก */}
              {selected.specs && (
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-semibold text-slateink block">ข้อมูลจำเพาะ</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.specs.map((sp) => (
                      <div key={sp} className="rounded-xl border border-slateink/8 bg-slateink/[0.03] p-2.5 text-xs text-slateink/70">
                        {sp}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ชิ้นส่วน */}
              {selected.components && (
                <div className="mt-5">
                  <span className="text-xs font-semibold text-slateink block mb-2">
                    รายการชิ้นส่วน ({selected.components.length} รายการ)
                  </span>
                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {selected.components.map((comp, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slateink/5">
                        <span className="text-slateink/80 font-medium">{comp.name}</span>
                        <span className="font-mono text-slateink/60">{comp.qty} {comp.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <Link
                  to={`/modules/${selected.code}`}
                  className="flex-1 rounded-xl bg-azure py-2.5 text-center text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-azure/90 transition-all"
                >
                  เปิดหน้ารายละเอียด & สแกน QR →
                </Link>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-slateink/15 py-2.5 px-4 text-xs font-medium text-slateink/70 hover:bg-slateink/5"
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal พิมพ์แผ่น QR Code ── */}
      <ModulePrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        modules={modules}
      />
    </section>
  );
}
