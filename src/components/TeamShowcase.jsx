// src/components/TeamShowcase.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockTeam } from '../data/mockData';

export default function TeamShowcase() {
  // state: รายชื่อทีมงานและที่ปรึกษา
  const [team, setTeam] = useState(mockTeam);

  // ดึงรายชื่อจากตาราง team_members เรียงตาม id พร้อม fallback เป็น mock
  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetchWithFallback('team_members', mockTeam, { order: 'id' });
      if (alive) setTeam(res.data);
    })();
    return () => { alive = false; };
  }, []);

  // แยกกลุ่มสมาชิกกับที่ปรึกษาเพื่อแสดงคนละบล็อก
  const members = team.filter((t) => t.type === 'member');
  const advisors = team.filter((t) => t.type === 'advisor');

  // ตัวแปร animation สำหรับ stagger ทั้งกริด
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const item = {
    hidden: { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // คอมโพเนนต์ย่อยการ์ดบุคคล ใช้ซ้ำทั้งสองกลุ่ม
  const PersonCard = ({ p, gold }) => (
    <motion.div
      variants={item}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`glass-card p-5 sm:p-6 text-center transition-shadow duration-300 ${
        gold ? 'hover:shadow-gold border-champagne/30' : 'hover:shadow-azure'
      }`}
    >
      {/* วงกลมอักษรย่อแทนรูปโปรไฟล์ */}
      <div
        className={`mx-auto grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full text-lg sm:text-xl font-semibold text-white ${
          gold
            ? 'bg-gradient-to-br from-champagne to-amber-400'
            : 'bg-gradient-to-br from-azure to-cyanglow'
        }`}
      >
        {p.initials}
      </div>
      <h3 className="mt-4 text-sm sm:text-base font-semibold text-slateink">{p.name}</h3>
      <p className={`mt-1 text-xs sm:text-sm font-medium ${gold ? 'text-champagne' : 'text-azure'}`}>
        {p.role}
      </p>
      <p className="mt-1 text-[11px] sm:text-xs font-light text-slateink/55">{p.org}</p>
    </motion.div>
  );

  return (
    <section id="team" className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* หัวข้อ Section จัดกลางบนทุกจอ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/8 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-azure">
            NMTC NOVA Team
          </span>
          <h2 className="h-fluid mt-4 text-slateink">
            เบื้องหลัง <span className="text-azure">RE:BUILD</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-slateink/65">
            ทีมนักออกแบบ และอาจารย์ที่ปรึกษา ที่ร่วมกันพัฒนาแนวคิดจนกลายเป็นประติมากรรมใช้งานจริง
          </p>
        </motion.div>

        {/* กริดสมาชิกทีม: 1 → 2 (sm) → 4 (lg) คอลัมน์ */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {members.map((p) => <PersonCard key={p.id} p={p} />)}
        </motion.div>

        {/* กลุ่มอาจารย์ที่ปรึกษา */}
        <h3 className="mt-14 sm:mt-16 text-center text-lg sm:text-xl font-semibold text-slateink">
          อาจารย์ที่ปรึกษา <span className="text-champagne">NMTC NOVA Advisors</span>
        </h3>
        <center>
          <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mt-6 grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {advisors.map((p) => <PersonCard key={p.id} p={p} gold />)}
        </motion.div>
        </center>
        

        {/* เครดิตสถาบันและการแข่งขัน */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 glass-card glow-gold mx-auto max-w-4xl p-6 sm:p-8 text-center"
        >
          <p className="text-xs sm:text-sm font-light leading-relaxed text-slateink/70">
            โครงการ <strong className="font-semibold text-slateink">IMPACT RE:BUILD</strong>{' '}
            จัดทำขึ้นภายใต้การแข่งขัน{' '}
            <strong className="font-semibold text-azure">IMPACT Rise Up Competition</strong>{' '}
            สนับสนุนโดย ศูนย์แสดงสินค้าและการประชุม อิมแพ็ค เมืองทองธานี
          </p>
        </motion.div>
      </div>
    </section>
  );
}
