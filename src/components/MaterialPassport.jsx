// src/components/MaterialPassport.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { fetchWithFallback } from '../lib/supabaseClient';
import { mockStats, mockMaterials } from '../data/mockData';

/* คอมโพเนนต์ย่อย: ตัวนับเลขวิ่งขึ้นเมื่อเลื่อนมาเห็น */
function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  // ตรวจว่าองค์ประกอบเข้ามาในจอแล้วหรือยัง (once = เล่นครั้งเดียว)
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  // ใส่ spring ให้ตัวเลขวิ่งแบบนุ่มนวล
  const spring = useSpring(mv, { damping: 40, stiffness: 90 });
  const [display, setDisplay] = useState('0');

  // เมื่อเข้าจอให้เซ็ตค่าเป้าหมาย ตัวเลขจะไต่ขึ้นเอง
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);

  // สมัครรับค่าที่เปลี่ยนแปลงแล้วฟอร์แมตเป็นตัวเลขมีคอมมา
  useEffect(() => {
    const unsub = spring.on('change', (v) =>
      setDisplay(v.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }))
    );
    return unsub; // ยกเลิก subscription ตอน unmount
  }, [spring, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function MaterialPassport() {
  // state: เก็บสถิติจาก Supabase (เริ่มต้นด้วย mock)
  const [stats, setStats] = useState(mockStats);
  // state: รายการวัสดุ
  const [materials, setMaterials] = useState(mockMaterials);
  // state: บอกว่าข้อมูลที่แสดงเป็นข้อมูลจำลองหรือข้อมูลจริง
  const [isMock, setIsMock] = useState(true);
  // state: สถานะกำลังโหลด
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Supabase ครั้งเดียวตอน mount
  useEffect(() => {
    let alive = true; // ธงกัน setState หลัง unmount
    (async () => {
      // ดึงสถิติสรุป (แถวเดียว) จากตาราง project_stats
      const s = await fetchWithFallback('project_stats', mockStats, { single: true });
      // ดึงรายการวัสดุ เรียงตาม id
      const m = await fetchWithFallback('materials', mockMaterials, { order: 'id' });
      if (!alive) return;
      setStats(s.data);
      setMaterials(m.data);
      setIsMock(s.isMock || m.isMock);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section id="passport" className="relative py-16 sm:py-20 lg:py-28">
      {/* พื้นหลังไล่เฉดอ่อนสร้างมิติ */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-azure/5 to-surface" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* ===== หัวข้อ Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-azure/30 bg-azure/8 px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-wider text-azure">
            MATERIAL PASSPORT
          </span>
          <h2 className="h-fluid mt-4 text-slateink">
            ทุกกิโลกรัม <span className="text-azure">มีที่มา</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-slateink/65">
            บันทึกเส้นทางของวัสดุทุกชิ้น ตั้งแต่ขยะที่เกิดขึ้นในงานอีเวนต์
            จนกลายเป็นแผ่นเทอราซโซที่ประกอบเป็นประติมากรรม ตรวจสอบย้อนกลับได้ทั้งหมด
          </p>
        </motion.div>

        {/* แจ้งเตือนเมื่อยังใช้ข้อมูลจำลอง (แสดงเฉพาะตอน dev) */}
        {!loading && isMock && (
          <p className="mt-4 text-[11px] font-light text-champagne">
            * กำลังแสดงข้อมูลจำลอง — เชื่อมต่อ Supabase เพื่อดูตัวเลขเรียลไทม์
          </p>
        )}

        {/* ===== การ์ดสถิติหลัก 2 ใบ ===== */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* การ์ดที่ 1: พลาสติกรีไซเคิล */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card glow-azure p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-medium tracking-wider text-azure">
                  TOTAL RECYCLED PLASTIC
                </p>
                <p className="mt-1 text-xs font-light text-slateink/55">พลาสติกรีไซเคิลที่นำมาใช้ทั้งหมด</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 19h10a2 2 0 002-2V9l-4-5H9L5 9v8a2 2 0 002 2z" />
                  <path d="M9 13h6" />
                </svg>
              </span>
            </div>
            <p className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slateink">
              <Counter value={stats.recycled_plastic_kg} />
              <span className="ml-2 text-xl sm:text-2xl font-medium text-azure">kg</span>
            </p>
            {/* แถบ progress สื่อความคืบหน้า */}
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slateink/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '78%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-azure to-cyanglow"
              />
            </div>
          </motion.div>

          {/* การ์ดที่ 2: คาร์บอนที่ลดได้ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card glow-gold p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-medium tracking-wider text-champagne">
                  CO₂ OFFSET
                </p>
                <p className="mt-1 text-xs font-light text-slateink/55">ปริมาณคาร์บอนที่ลดได้จากโครงการ</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-champagne/12 text-champagne">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c5-3 8-7 8-11a8 8 0 10-16 0c0 4 3 8 8 11z" />
                  <path d="M12 21V9" />
                </svg>
              </span>
            </div>
            <p className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slateink">
              <Counter value={stats.co2_offset_kg} />
              <span className="ml-2 text-xl sm:text-2xl font-medium text-champagne">kg</span>
            </p>
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slateink/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '88%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.15, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-champagne to-cyanglow"
              />
            </div>
          </motion.div>
        </div>

        {/* ===== ตัวเลขย่อยของแหล่งวัสดุ: 1 คอลัมน์มือถือ → 3 คอลัมน์เดสก์ท็อป ===== */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: 'ขวด PET', value: stats.pet_bottles, unit: 'ขวด', color: 'text-azure' },
            { label: 'ป้ายไวนิล', value: stats.vinyl_banner_sqm, unit: 'ตร.ม.', color: 'text-champagne' },
            { label: 'แก้วพลาสติก', value: stats.plastic_cups, unit: 'ใบ', color: 'text-cyanglow' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-5 sm:p-6 text-center hover:shadow-azure transition-shadow duration-300"
            >
              <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>
                <Counter value={item.value} />
              </p>
              <p className="mt-1 text-xs sm:text-sm font-light text-slateink/60">
                {item.label} · {item.unit}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===== เส้นทางการแปรรูปวัสดุ ===== */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-slateink">
            เส้นทางการแปรรูป <span className="text-azure">Waste → Terrazzo</span>
          </h3>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {materials.map((mat, i) => (
              <motion.article
                key={mat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="glass-card group relative overflow-hidden p-6 transition-shadow duration-300 hover:shadow-xl"
              >
                {/* แถบสีบนหัวการ์ดตามสีประจำวัสดุ */}
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: mat.color }} />

                {/* ตัวเลขลำดับขั้นตอน */}
                <span className="text-5xl font-bold text-slateink/8 leading-none">
                  0{i + 1}
                </span>

                <h4 className="mt-2 text-base sm:text-lg font-semibold text-slateink">{mat.name}</h4>
                <p className="mt-1 text-xs font-light text-slateink/55">แหล่งที่มา: {mat.source}</p>

                {/* ลูกศรแสดงผลลัพธ์หลังแปรรูป */}
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-slateink/[0.03] p-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: mat.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-slateink/75">{mat.output}</p>
                </div>

                {/* สัดส่วนวัสดุในโครงสร้าง */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slateink/60">
                    <span>สัดส่วนในโครงสร้าง</span>
                    <span style={{ color: mat.color }}>{mat.ratio}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slateink/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mat.ratio}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: mat.color }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
