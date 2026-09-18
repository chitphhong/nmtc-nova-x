// src/components/WisahakijPartner.jsx
// Section ความร่วมมือ "วิสาหกิจชุมชนแหลมยายเอียง" — ถัดจากผู้สนับสนุนหลัก
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const processSteps = [
  {
    label: 'รวบรวม',
    icon: '\u267b\ufe0f',
    desc: 'นำฝาขวดพลาสติก HDPE จากงานอีเวนต์ IMPACT Rise Up Competition',
  },
  {
    label: 'Recycle & Upcycle',
    icon: '\ud83d\udd04',
    desc: 'บด อัดความร้อน และขึ้นรูปผ่านกระบวนการ Precious Plastic',
  },
  {
    label: 'แผ่นพลาสติก 60×60 ซม.',
    icon: '\ud83d\udfe6',
    desc: 'ผลิตเป็นแผ่นพลาสติกรีไซเคิลขนาด 60×60 cm วัสดุหลักของชิ้นงาน',
  },
  {
    label: 'คืนสู่ชุมชน',
    icon: '\ud83c\udf31',
    desc: 'รายได้กระจายกลับสู่วิสาหกิจชุมชน ส่งเสริมเศรษฐกิจหมุนเวียนอย่างยั่งยืน',
  },
];

const galleryImages = [
  { src: '/wisahakij_bg.jpg',       alt: 'ทีมงานและสมาชิกชุมชนถือแผ่นพลาสติกรีไซเคิล' },
  { src: '/wisahakij_process1.jpg', alt: 'ฝาขวดพลาสติกบดย่อยก่อนเข้าแม่พิมพ์' },
  { src: '/wisahakij_process2.jpg', alt: 'กระบวนการอัดขึ้นรูปแผ่นพลาสติก' },
  { src: '/wisahakij_process3.jpg', alt: 'ชั่งน้ำหนักพลาสติก HDPE ก่อนแปรรูป' },
];

export default function WisahakijPartner() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);
  return (
    <section
      id="wisahakij-partner"
      className="relative w-full overflow-hidden"
    >
      {/* ── ภาพพื้นหลัง — ลดความสว่างมากขึ้น ── */}
      <div className="absolute inset-0">
        <img
          src="/wisahakij_bg.jpg"
          alt="วิสาหกิจชุมชนแหลมยายเอียง"
          className="h-full w-full object-cover object-center opacity-40"
          loading="lazy"
        />
        {/* overlay เข้มกว่าเดิม เพื่อให้ข้อความอ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-t from-slateink/95 via-slateink/80 to-slateink/60" />
      </div>

      {/* ── เนื้อหา (ใช้ min-h เดียวกับ GrandSponsor) ── */}
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-7xl items-center px-4 sm:px-8 lg:px-16 py-20 sm:py-24">
        {/* ── กล่องกระจกขอบเขียว เหมือน GrandSponsor ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full rounded-3xl border-2 border-cyanglow/55 bg-white/10 p-6 sm:p-10 lg:p-14 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-2xl"
        >
          {/* ── badge ── */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyanglow bg-cyanglow/15 px-4 py-2 text-sm sm:text-base font-semibold tracking-[0.18em] text-white"
          >
            <span className="h-2 w-2 rounded-full bg-cyanglow animate-pulse" />
            ความร่วมมือด้านวัสดุ
          </motion.span>

          {/* ── หัวข้อ ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              <span className="block mt-1 bg-gradient-to-r from-cyanglow to-teal-300 bg-clip-text text-transparent">
                วิสาหกิจชุมชนแหลมยายเอียง
              </span>
              <span className="mt-2 block text-base sm:text-xl md:text-2xl font-light text-white/80">
                ศูนย์นวัตกรรมการจัดการขยะพลาสติกชุมชนภาคตะวันออกเฉียงเหนือ
              </span>
            </h2>
          </motion.div>

          {/* ── description ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-3xl text-sm sm:text-base font-light leading-relaxed text-white/80"
          >
            เราได้รับการสนับสนุนจาก{' '}
            <strong className="font-medium text-cyanglow">
              วิสาหกิจชุมชนแหลมยายเอียง
            </strong>{' '}
            ในการนำ{' '}
            <strong className="font-medium text-white">ฝาขวดพลาสติก HDPE</strong>{' '}
            จากงานอีเวนต์มาผ่านกระบวนการ{' '}
            <strong className="font-medium text-white">Recycle & Upcycle</strong>{' '}
            ขึ้นรูปเป็น{' '}
            <strong className="font-medium text-white">แผ่นพลาสติกขนาด 60×60 ซม.</strong>{' '}
            เพื่อใช้เป็นวัสดุหลักของชิ้นงาน ซึ่งช่วยส่งเสริมการรณรงค์คัดแยกขยะ
            และกระจายรายได้กลับคืนสู่ชุมชนอย่างยั่งยืน
          </motion.p>

          {/* ── process steps ── */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/25 bg-white/8 p-5 backdrop-blur-md transition-colors duration-300 hover:border-cyanglow/60"
              >
                <span className="text-2xl mb-3 block">{step.icon}</span>
                <h3 className="text-sm sm:text-base font-semibold text-cyanglow mb-1">{step.label}</h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-white/65">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── gallery ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.65 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {galleryImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/20 aspect-square text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyanglow"
                aria-label={`ดูภาพขนาดเต็ม: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slateink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-2 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slateink/80 text-cyanglow shadow-lg border border-cyanglow/30 mb-2 transform scale-90 transition-transform group-hover:scale-100">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/90 font-medium">ดูภาพเต็ม</span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* ── divider + tagline ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="mt-8 h-px w-full origin-left bg-gradient-to-r from-cyanglow via-cyanglow/40 to-transparent"
          />
          <p className="mt-4 text-[11px] sm:text-xs font-light tracking-wider text-white/50">
            RECYCLE · UPCYCLE · CIRCULAR ECONOMY · COMMUNITY EMPOWERMENT
          </p>
        </motion.div>
      </div>

      {/* ── Fullscreen Image Modal ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slateink/90 p-3 sm:p-6 backdrop-blur-xl"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-cyanglow/40 bg-slateink/95 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with counter & close button */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3 sm:py-3.5">
                <span className="text-xs sm:text-sm font-light text-white/70">
                  ภาพที่ <span className="font-semibold text-cyanglow">{selectedIndex + 1}</span> จาก {galleryImages.length}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-cyanglow transition-colors"
                  aria-label="ปิดภาพ"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Main Image Area */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black/40 p-2 sm:p-4 min-h-[300px] max-h-[72vh]">
                <img
                  key={galleryImages[selectedIndex].src}
                  src={galleryImages[selectedIndex].src}
                  alt={galleryImages[selectedIndex].alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slateink/80 border border-white/20 text-white hover:bg-cyanglow/20 hover:border-cyanglow hover:text-cyanglow transition-all shadow-xl"
                  aria-label="ภาพก่อนหน้า"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
                  }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slateink/80 border border-white/20 text-white hover:bg-cyanglow/20 hover:border-cyanglow hover:text-cyanglow transition-all shadow-xl"
                  aria-label="ภาพถัดไป"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="border-t border-white/10 bg-slate-900/90 px-5 py-3.5 sm:px-6">
                <p className="text-xs sm:text-sm font-light text-white/90">
                  {galleryImages[selectedIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
