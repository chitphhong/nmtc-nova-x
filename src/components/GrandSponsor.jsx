// src/components/GrandSponsor.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function GrandSponsor() {
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
            <svg className="h-4 w-4" viewBox="0 0 24 24">
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
            {/* กล่องโลโก้สีขาว ลดขนาด 50% ชิดซ้าย */}
            <div className="inline-flex items-center justify-start rounded-2xl bg-white/95 p-3.5 sm:p-4 shadow-md backdrop-blur-md mb-4 border border-white/50">
              <img 
                src="/Impact_Muang_Thong_Thani_Logo.png" 
                alt="IMPACT Muang Thong Thani" 
                className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
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
            className="mt-6 max-w-3xl text-sm sm:text-base font-light leading-relaxed text-white/80"
          >
            ขอขอบคุณ <strong className="font-medium text-champagne">อิมแพ็ค เมืองทองธานี</strong>{' '}
            ในฐานะผู้สนับสนุนหลักและเจ้าภาพจัดการแข่งขัน{' '}
            <strong className="font-medium text-white">IMPACT Rise Up Competition</strong>{' '}
            ที่เปิดพื้นที่ให้คนรุ่นใหม่ได้เปลี่ยนขยะจากงานอีเวนต์ให้กลายเป็นงานออกแบบที่ใช้ได้จริง
            ภายใต้นโยบาย Green Meetings และการจัดงานอย่างยั่งยืน
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
    </section>
  );
}