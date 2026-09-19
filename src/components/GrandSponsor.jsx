// src/components/GrandSponsor.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const impactActivities = [
  {
    src: '/impact_activity1.jpg',
    alt: 'กิจกรรม "ทำดี! มี IMPACT" รณรงค์ลด นำกลับมาใช้ใหม่ รีไซเคิล และคัดแยกขยะในพื้นที่ศูนย์แสดงสินค้า',
  },
  {
    src: '/impact_activity2.jpg',
    alt: 'โครงการ "อิมแพ็ครักษ์โลก" รณรงค์การจัดการขยะขวดพลาสติกเพื่อเข้าสู่กระบวนการ Circular Economy',
  },
  {
    src: '/impact_activity3.jpg',
    alt: 'กิจกรรมรณรงค์คัดแยกขวดพลาสติก Reduce Reuse Recycle ภายในงานแสดงสินค้า อิมแพ็ค เมืองทองธานี',
  },
  {
    src: '/impact_activity4.jpg',
    alt: 'จุดคัดแยกและตัดเตรียมขวดพลาสติกเพื่อส่งต่อไปยังกระบวนการรีไซเคิลอย่างยั่งยืน',
  },
];

export default function GrandSponsor() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % impactActivities.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + impactActivities.length) % impactActivities.length);
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

  // จุดเด่นด้านความยั่งยืนของผู้สนับสนุน — แยกเป็น array เพื่อ map ได้ง่าย
  const highlights = [
    { title: 'Green Meetings', desc: 'นโยบายจัดประชุมและอีเวนต์ที่ลดผลกระทบต่อสิ่งแวดล้อม' },
    { title: 'Waste Separation', desc: 'ระบบคัดแยกขยะครบวงจรทั่วพื้นที่ศูนย์แสดงสินค้า' },
    { title: 'Sustainable Events', desc: 'มาตรฐานการจัดงานยั่งยืนระดับสากล' },
  ];

  return (
    <section id="sponsor" className="relative w-full overflow-hidden">
      {/* ===== ภาพพื้นหลังเต็มความกว้าง: มุมสูง IMPACT Challenger ===== */}
      <div className="absolute inset-0">
        <img
          src="/image_318df1.png"
          alt="ภาพมุมสูงศูนย์แสดงสินค้าและการประชุม อิมแพ็ค เมืองทองธานี"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {/* ไล่เฉดเข้มจากล่างขึ้นบนเพื่อให้อ่านข้อความบนแบนเนอร์ได้ชัด */}
        <div className="absolute inset-0 bg-gradient-to-t from-slateink/80 via-slateink/50 to-slateink/15" />
      </div>

      {/* ===== แบนเนอร์กระจกขอบทองซ้อนทับ ===== */}
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-7xl items-center px-4 sm:px-8 lg:px-16 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full rounded-3xl border-2 border-champagne/55 bg-white/10 p-6 sm:p-10 lg:p-14 shadow-gold backdrop-blur-2xl"
        >
          {/* ป้ายกำกับสถานะผู้สนับสนุน */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-champagne bg-champagne/15 px-4 py-2 text-sm sm:text-base font-semibold tracking-[0.18em] text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
            </svg>
            ผู้สนับสนุนหลักของเรา
          </motion.span>

          {/* ชื่อผู้สนับสนุนหลัก */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6"
          >
            {/* โลโก้ผู้สนับสนุนหลัก โดยไม่ใช้พื้นหลังสีขาว */}
            <div className="mb-4 inline-flex items-center justify-start">
              <img 
                src="/Impact_Muang_Thong_Thani_Logo.png" 
                alt="IMPACT Muang Thong Thani" 
                className="h-14 w-auto object-contain sm:h-16 md:h-20 lg:h-24"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
            <span className="block mt-1 bg-gradient-to-r from-champagne to-amber-200 bg-clip-text text-transparent">
              Exhibition and Convention Center
            </span>
            <span className="mt-2 block text-base sm:text-xl md:text-2xl font-light text-white/80">
              เมืองทองธานี · Muang Thong Thani
            </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-4xl text-sm sm:text-base font-light leading-relaxed text-white/80"
          >
            ขอขอบพระคุณ <strong className="font-medium text-champagne">บริษัท อิมแพ็ค เอ็กซิบิชั่น แมเนจเม้นท์ จำกัด (อิมแพ็ค เมืองทองธานี)</strong>{' '}
            ในฐานะผู้สนับสนุนหลักและเจ้าภาพการแข่งขัน{' '}
            <strong className="font-medium text-white">IMPACT Rise Up Competition</strong>{' '}
            ที่เปิดโอกาสและมอบพื้นที่สร้างสรรค์ให้แก่พวกเรา{' '}
            <strong className="font-medium text-white">ทีม NMTC NOVA (วิทยาลัยเทคนิคนวมินทราชินีมุกดาหาร)</strong>{' '}
            ในการต่อยอดนวัตกรรม{' '}
            <strong className="font-medium text-champagne">IMPACT RE:BUILD</strong>{' '}
            เพื่อเปลี่ยนขยะจากงานอีเวนต์ให้กลายเป็นงานประติมากรรมอัจฉริยะที่ใช้งานได้จริง พร้อมร่วมขับเคลื่อนนโยบาย Green Meetings, มาตรฐาน ISO 20121 และการยกระดับเศรษฐกิจหมุนเวียน (Circular Economy) ร่วมกับชุมชนอย่างยั่งยืน
          </motion.p>

          {/* จุดเด่นด้านความยั่งยืน: 1 คอลัมน์มือถือ → 3 คอลัมน์ตั้งแต่ md */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/25 bg-white/8 p-5 backdrop-blur-md transition-colors duration-300 hover:border-champagne/60"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyanglow shadow-cyan" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">{h.title}</h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-light leading-relaxed text-white/65">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── แกลเลอรีภาพกิจกรรมด้านความยั่งยืน ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.65 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {impactActivities.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/20 aspect-square text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne"
                aria-label={`ดูภาพขนาดเต็ม: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slateink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-2 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slateink/80 text-champagne shadow-lg border border-champagne/40 mb-2 transform scale-90 transition-transform group-hover:scale-100">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/90 font-medium">ดูภาพเต็ม</span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* เส้นคั่นทองและข้อความปิดท้าย */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="mt-8 h-px w-full origin-left bg-gradient-to-r from-champagne via-champagne/40 to-transparent"
          />
          <p className="mt-4 text-[11px] sm:text-xs font-light tracking-wider text-white/50">
            SUSTAINABLE EVENTS · GREEN MEETINGS · CIRCULAR DESIGN
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
              className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-champagne/40 bg-slateink/95 shadow-[0_0_50px_rgba(212,175,55,0.2)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with counter & close button */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3 sm:py-3.5">
                <span className="text-xs sm:text-sm font-light text-white/70">
                  ภาพที่ <span className="font-semibold text-champagne">{selectedIndex + 1}</span> จาก {impactActivities.length}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-champagne transition-colors"
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
                  key={impactActivities[selectedIndex].src}
                  src={impactActivities[selectedIndex].src}
                  alt={impactActivities[selectedIndex].alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev - 1 + impactActivities.length) % impactActivities.length);
                  }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slateink/80 border border-white/20 text-white hover:bg-champagne/20 hover:border-champagne hover:text-champagne transition-all shadow-xl"
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
                    setSelectedIndex((prev) => (prev + 1) % impactActivities.length);
                  }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slateink/80 border border-white/20 text-white hover:bg-champagne/20 hover:border-champagne hover:text-champagne transition-all shadow-xl"
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
                  {impactActivities[selectedIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}