// src/components/TeamShowcase.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockTeam } from '../data/mockdata';

export default function TeamShowcase({ hideHeader = false }) {
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
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
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
      {/* ถ้ามี image_url ให้แสดงรูปภาพ ถ้าไม่มีให้ใช้อักษรย่อเดิมเป็น fallback */}
      {p.image_url ? (
        <img
          src={p.image_url}
          alt={p.name}
          className={`mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover shadow-md border-2 ${
            gold ? 'border-champagne' : 'border-azure'
          }`}
        />
      ) : (
        <div
          className={`mx-auto grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full text-lg sm:text-xl font-semibold text-white ${
            gold
              ? 'bg-gradient-to-br from-champagne to-amber-400'
              : 'bg-gradient-to-br from-azure to-cyanglow'
          }`}
        >
          {p.initials}
        </div>
      )}
      <h3 className="mt-4 text-sm sm:text-base font-semibold text-slateink">{p.name}</h3>
      <p className={`mt-1 text-xs sm:text-sm font-medium ${gold ? 'text-champagne' : 'text-azure'}`}>
        {p.role}
      </p>
      <p className="mt-1 text-[11px] sm:text-xs font-light text-slateink/55">{p.org}</p>
    </motion.div>
  );

  return (
    <section id="team" className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* หัวข้อ Section (ซ่อนได้เมื่อถูกเรียกจากหน้า TeamPage ที่มี Hero Banner อยู่แล้ว) */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
        )}

        {/* กริดสมาชิกทีม: 1 → 2 (sm) → 4 (lg) คอลัมน์ */}
        <div className="mt-6 sm:mt-10">
          <h3 className="mb-6 text-center text-lg sm:text-xl font-semibold text-slateink">
            สมาชิกทีม <span className="text-azure">Team Members</span>
          </h3>
          <motion.div
            key={`members-${members.length}`}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {members.map((p) => <PersonCard key={p.id} p={p} />)}
          </motion.div>
        </div>

        {/* กลุ่มอาจารย์ที่ปรึกษา */}
        <div className="mt-14 sm:mt-16">
          <h3 className="text-center text-lg sm:text-xl font-semibold text-slateink">
            อาจารย์ที่ปรึกษา <span className="text-champagne">NMTC NOVA Advisors</span>
          </h3>
          <motion.div
            key={`advisors-${advisors.length}`}
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl"
          >
            {advisors.map((p) => (
              <div key={p.id} className="w-full sm:w-[calc(50%-12px)] max-w-sm">
                <PersonCard p={p} gold />
              </div>
            ))}
          </motion.div>
        </div>

        {/* เครดิตสถาบันและการแข่งขัน */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
