// src/components/WisahakijPartner.jsx
// Section ความร่วมมือ "วิสาหกิจชุมชนแหลมยายเอียง" — ถัดจากผู้สนับสนุนหลัก
import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    label: 'รวบรวม',
    icon: '♻️',
    desc: 'นำฝาขวดพลาสติก HDPE จากงานอีเวนต์ IMPACT Rise Up Competition',
  },
  {
    label: 'Recycle & Upcycle',
    icon: '🔄',
    desc: 'บด อัดความร้อน และขึ้นรูปผ่านกระบวนการ Precious Plastic',
  },
  {
    label: 'แผ่นพลาสติก 60×60 ซม.',
    icon: '🟦',
    desc: 'ผลิตเป็นแผ่นพลาสติกรีไซเคิลขนาด 60×60 cm วัสดุหลักของชิ้นงาน',
  },
  {
    label: 'คืนสู่ชุมชน',
    icon: '🌱',
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
  return (
    <section
      id="wisahakij-partner"
      className="relative w-full overflow-hidden"
    >
      {/* ── ภาพพื้นหลัง (รูปแรก: กลุ่มคนถือแผ่นพลาสติก) ── */}
      <div className="absolute inset-0">
        <img
          src="/wisahakij_bg.jpg"
          alt="วิสาหกิจชุมชนแหลมยายเอียง"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {/* overlay เพื่อให้อ่านข้อความได้ชัด */}
        <div className="absolute inset-0 bg-gradient-to-t from-slateink/92 via-slateink/70 to-slateink/40" />
      </div>

      {/* ── เนื้อหา ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-20 sm:py-28">

        {/* ── badge ── */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyanglow bg-cyanglow/15 px-4 py-2 text-sm font-semibold tracking-[0.15em] text-white"
        >
          <span className="h-2 w-2 rounded-full bg-cyanglow shadow-cyan animate-pulse" />
          ความร่วมมือด้านวัสดุ
        </motion.span>

        {/* ── หัวข้อ ── */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white"
        >
          วิสาหกิจชุมชน
          <span className="block mt-1 bg-gradient-to-r from-cyanglow to-teal-300 bg-clip-text text-transparent">
            แหลมยายเอียง
          </span>
        </motion.h2>

        {/* ── subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-2 text-sm sm:text-base font-light tracking-widest text-white/60 uppercase"
        >
          ศูนย์นวัตกรรมการจัดการขยะพลาสติกชุมชนภาคตะวันออกเฉียงเหนือ
        </motion.p>

        {/* ── description card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 max-w-3xl rounded-2xl border border-white/20 bg-white/8 p-6 sm:p-8 backdrop-blur-xl"
        >
          <p className="text-sm sm:text-base font-light leading-relaxed text-white/85">
            เราได้รับการสนับสนุนจาก{' '}
            <strong className="font-semibold text-cyanglow">
              วิสาหกิจชุมชนแหลมยายเอียง
            </strong>{' '}
            ในการนำ{' '}
            <strong className="font-medium text-white">
              ฝาขวดพลาสติก HDPE
            </strong>{' '}
            จากงานอีเวนต์มาผ่านกระบวนการ{' '}
            <strong className="font-medium text-white">Recycle & Upcycle</strong>{' '}
            ขึ้นรูปเป็น{' '}
            <strong className="font-medium text-white">
              แผ่นพลาสติกขนาด 60×60 ซม.
            </strong>{' '}
            เพื่อใช้เป็นวัสดุหลักของชิ้นงาน ซึ่งช่วยส่งเสริมการรณรงค์คัดแยกขยะ
            และกระจายรายได้กลับคืนสู่ชุมชนอย่างยั่งยืน
          </p>
        </motion.div>

        {/* ── process steps ── */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              className="flex flex-col rounded-2xl border border-white/20 bg-white/8 p-5 backdrop-blur-md transition-colors duration-300 hover:border-cyanglow/60"
            >
              <span className="text-2xl mb-3">{step.icon}</span>
              <h3 className="text-sm font-semibold text-cyanglow mb-1">
                {step.label}
              </h3>
              <p className="text-xs font-light leading-relaxed text-white/65">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.65 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/15 aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* ── divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-10 h-px w-full origin-left bg-gradient-to-r from-cyanglow via-cyanglow/30 to-transparent"
        />
        <p className="mt-4 text-[11px] sm:text-xs font-light tracking-wider text-white/50">
          RECYCLE · UPCYCLE · CIRCULAR ECONOMY · COMMUNITY EMPOWERMENT
        </p>
      </div>
    </section>
  );
}
