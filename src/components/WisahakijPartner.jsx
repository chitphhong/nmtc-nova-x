// src/components/WisahakijPartner.jsx
// Section ความร่วมมือ "วิสาหกิจชุมชนแหลมยายเอียง" — ถัดจากผู้สนับสนุนหลัก
import React from 'react';
import { motion } from 'framer-motion';

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
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-white/20 aspect-square"
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
    </section>
  );
}
