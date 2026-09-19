// src/pages/ModuleDetailPage.jsx
// หน้ารายละเอียดเฉพาะของแต่ละโมดูล (เปิดผ่าน QR Code หรือคลิกจากหน้า /modules)
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockModules } from '../data/mockdata';

// ไอคอนแยกตามหมวดหมู่ชิ้นส่วน
const componentIcons = {
  cube: '🧊',
  structure: '🏗️',
  metal: '📏',
  fitting: '🔩',
  plastic: '🟦',
  mesh: '🕸️',
  fabric: '🧣',
  hardware: '🚪',
  nature: '🌿',
  electrical: '💡',
  default: '📦',
};

export default function ModuleDetailPage() {
  const { code } = useParams();
  const [allModules, setAllModules] = useState(mockModules);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // ดึงข้อมูลโมดูลจาก Supabase หรือ fallback
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const res = await fetchWithFallback('modules', mockModules);
      if (alive) {
        setAllModules(res.data && res.data.length > 0 ? res.data : mockModules);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // หาโมดูลที่ตรงกับ code (case-insensitive)
  const currentModule = allModules.find(
    (m) => String(m.code || m.id).toLowerCase() === String(code || '').toLowerCase()
  );

  // หา Index เพื่อทำ Next / Prev navigation
  const currentIndex = allModules.findIndex(
    (m) => String(m.code || m.id).toLowerCase() === String(code || '').toLowerCase()
  );
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex >= 0 && currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  if (!loading && !currentModule) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <span className="text-6xl mb-4">🔍</span>
        <h1 className="text-3xl font-bold text-slateink">ไม่พบรหัสโมดูล "{code}"</h1>
        <p className="mt-2 text-slateink/60">กรุณาตรวจสอบรหัสโมดูล หรือเลือกจากรายการทั้งหมด</p>
        <Link
          to="/modules"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-azure px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-azure/90 transition-all"
        >
          ← ดูโมดูลทั้งหมด
        </Link>
      </div>
    );
  }

  // รูปภาพของโมดูล (ถ้าไม่มี ให้เตรียม placeholder ไว้)
  const moduleImages = currentModule?.images && currentModule.images.length > 0
    ? currentModule.images
    : [];

  return (
    <div className="relative pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-surface">
      {/* Background Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* ── Breadcrumbs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs font-light text-slateink/60 mb-6"
        >
          <Link to="/" className="hover:text-azure transition-colors">หน้าหลัก</Link>
          <span>/</span>
          <Link to="/modules" className="hover:text-azure transition-colors">โมดูลโครงสร้าง</Link>
          <span>/</span>
          <span className="text-azure font-medium">{currentModule?.code || code}</span>
        </motion.div>

        {/* ── Main Header Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card overflow-hidden border-white/70 p-6 sm:p-10 shadow-xl"
        >
          <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-azure/10 border border-azure/30 px-3.5 py-1 text-xs sm:text-sm font-semibold tracking-wider text-azure">
                  MODULE {currentModule?.code}
                </span>
                <span className="inline-flex items-center rounded-full bg-cyanglow/10 border border-cyanglow/30 px-3.5 py-1 text-xs font-medium text-cyanglow">
                  {currentModule?.category_th || currentModule?.category || 'โมดูลนวัตกรรม'}
                </span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slateink">
                {currentModule?.title_th || currentModule?.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg font-light leading-relaxed text-slateink/80 max-w-3xl">
                {currentModule?.desc}
              </p>

              {/* Specs Badges */}
              {currentModule?.specs && currentModule.specs.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {currentModule.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slateink/10 bg-slateink/5 px-3 py-1.5 text-xs font-medium text-slateink/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-azure" />
                      {spec}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </motion.div>

        {/* ── Section: รูปภาพประจำโมดูล (Image Gallery) ── */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slateink">
                ภาพถ่ายโมดูลและการประกอบ
              </h2>
              <p className="text-xs sm:text-sm text-slateink/60 font-light mt-0.5">
                คลิกที่รูปภาพเพื่อเปิดดูภาพขยายขนาดเต็ม
              </p>
            </div>
          </div>

          {moduleImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {moduleImages.map((img, i) => {
                const imgSrc = typeof img === 'string' ? img : img.src;
                const imgAlt = typeof img === 'string' ? `ภาพโมดูล ${currentModule?.code} รูปที่ ${i + 1}` : (img.alt || img.label);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage({ src: imgSrc, alt: imgAlt })}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-white/60 bg-white/40 aspect-square shadow-sm hover:shadow-md cursor-pointer transition-all"
                  >
                    <img
                      src={imgSrc}
                      alt={imgAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slateink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-azure shadow-md">
                        🔍
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slateink/20 bg-white/40 p-8 sm:p-10 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-azure/10 text-2xl text-azure mb-3">
                📷
              </div>
              <h3 className="text-base font-medium text-slateink">พร้อมสำหรับการใส่รูปภาพ</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slateink/60 max-w-md mx-auto">
                สามารถนำไฟล์รูปภาพมาวางในโฟลเดอร์ <code className="bg-slateink/5 px-2 py-0.5 rounded text-azure font-mono">public/modules/{currentModule?.code.toLowerCase()}.jpg</code> หรืออัปเดตผ่านคอลัมน์ images ใน Supabase ได้ทันที
              </p>
            </div>
          )}
        </div>

        {/* ── Section: รายการชิ้นส่วนและวัสดุ (Bill of Materials) ── */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slateink">
                รายการชิ้นส่วนและวัสดุ (BOM)
              </h2>
              <p className="text-xs sm:text-sm text-slateink/60 font-light mt-0.5">
                รายการชิ้นส่วนโครงสร้างและวัสดุรีไซเคิลที่ใช้ประกอบโมดูล {currentModule?.code}
              </p>
            </div>
            <span className="rounded-full bg-azure/10 border border-azure/20 px-3 py-1 text-xs font-semibold text-azure">
              รวม {currentModule?.components?.length || 0} รายการ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentModule?.components?.map((comp, i) => {
              const icon = componentIcons[comp.category] || componentIcons.default;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/80 bg-white/70 p-4 sm:p-5 shadow-sm backdrop-blur-sm hover:border-azure/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{icon}</span>
                    <span className="rounded-lg bg-slateink/5 px-2.5 py-1 text-xs font-bold font-mono text-slateink">
                      {comp.qty} {comp.unit}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-semibold text-slateink">
                    {comp.name}
                  </h3>
                  <p className="mt-1 text-xs text-slateink/50 capitalize">
                    หมวด: {comp.category || 'ชิ้นส่วนประกอบ'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Next / Prev Navigation ── */}
        <div className="mt-16 flex items-center justify-between border-t border-slateink/10 pt-8">
          {prevModule ? (
            <Link
              to={`/modules/${prevModule.code}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slateink/70 hover:text-azure transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              <span>{prevModule.code}: {prevModule.title_th}</span>
            </Link>
          ) : <div />}

          <Link
            to="/modules"
            className="rounded-full bg-white/80 border border-slateink/15 px-5 py-2 text-xs sm:text-sm font-medium text-slateink hover:bg-white hover:text-azure transition-all shadow-sm"
          >
            ดูโมดูลทั้งหมด ({allModules.length} โมดูล)
          </Link>

          {nextModule ? (
            <Link
              to={`/modules/${nextModule.code}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slateink/70 hover:text-azure transition-colors"
            >
              <span>{nextModule.code}: {nextModule.title_th}</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 18l6-6-6-6" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* ── Image Modal Lightbox ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slateink/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 bg-slateink shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
              >
                ✕
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
              <div className="border-t border-white/10 bg-slate-900/90 px-5 py-3 text-xs text-white/80">
                {selectedImage.alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
