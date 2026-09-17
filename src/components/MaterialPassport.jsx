// src/components/MaterialPassport.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchWithFallback, supabase } from '../lib/supabaseClient';
import { mockMaterials } from '../data/mockdata';

/* คอมโพเนนต์ย่อย: ฟอร์แมตตัวเลขจริงจาก Supabase ให้แสดงทันทีทุกอุปกรณ์ */
function Counter({ value, suffix = '', decimals = 0 }) {
  const numericValue = Number(value) || 0;
  const display = numericValue.toLocaleString('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span>{display}{suffix}</span>;
}

function normalizeMaterials(rows = []) {
  if (!Array.isArray(rows)) return [];

  return rows.map((mat) => {
    const rawImages = Array.isArray(mat?.images)
      ? mat.images
      : Array.isArray(mat?.image_url)
        ? mat.image_url
        : Array.isArray(mat?.image)
          ? mat.image
          : mat?.image_url || mat?.image || [];

    const safeImages = (Array.isArray(rawImages) ? rawImages : [rawImages])
      .flatMap((entry) => {
        if (typeof entry === 'string' && entry.trim()) return [entry.trim()];
        if (entry && typeof entry === 'object') {
          const url = entry.url || entry.src || entry.path || entry.image_url || entry.link;
          if (typeof url === 'string' && url.trim()) return [url.trim()];
        }
        return [];
      })
      .filter(Boolean);

    return {
      ...mat,
      images: safeImages,
    };
  });
}

export default function MaterialPassport() {
  // state: เก็บสถิติจริงจากตาราง project_stats
  const [stats, setStats] = useState(null);
  // state: รายการวัสดุ
  const [materials, setMaterials] = useState(mockMaterials);
  // ตาราง materials ยังอนุญาตให้ใช้ mock ได้จนกว่าจะเพิ่มข้อมูลจริง
  const [isMaterialsMock, setIsMaterialsMock] = useState(true);
  // state: สถานะกำลังโหลด
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Supabase ครั้งเดียวตอน mount
  useEffect(() => {
    let alive = true; // ธงกัน setState หลัง unmount
    (async () => {
      // ดึงสถิติล่าสุดจาก Supabase โดยตรง — ไม่ใช้ mockStats แทนข้อมูลจริง
      const { data: projectStats, error: statsError } = supabase
        ? await supabase
            .from('project_stats')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle()
        : { data: null, error: new Error('Supabase ยังไม่ได้ตั้งค่า') };

      if (statsError) console.error('[Supabase] อ่าน project_stats ไม่สำเร็จ:', statsError);
      // ดึงรายการวัสดุ เรียงตาม id
      const m = await fetchWithFallback('materials', mockMaterials, { order: 'id' });
      if (!alive) return;

      const normalizedMaterials = normalizeMaterials(m.data);
      setStats(projectStats);
      setMaterials(normalizedMaterials.length ? normalizedMaterials : mockMaterials);
      setIsMaterialsMock(m.isMock && normalizedMaterials.length === 0);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section id="passport" className="relative pt-2 pb-16 sm:pt-4 sm:pb-20">
      {/* พื้นหลังไล่เฉดอ่อนสร้างมิติ */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-azure/5 to-surface" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* ===== หัวข้อ Section ===== */}
        

        {/* แจ้งเฉพาะรายการวัสดุที่ยังเป็นข้อมูลจำลอง */}
        {!loading && isMaterialsMock && (
          <p className="mt-2 text-[11px] font-light text-champagne">
            * รายการเส้นทางวัสดุยังเป็นข้อมูลจำลอง — สถิติด้านบนดึงจาก Supabase แล้ว
          </p>
        )}

        {/* ===== การ์ดสถิติหลัก 2 ใบ ===== */}
        <div className="mt-2 sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
              <Counter value={stats?.recycled_plastic_kg ?? 0} decimals={1} />
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
              <Counter value={stats?.co2_offset_kg ?? 0} />
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
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'ฝาขวดพลาสติก', value: stats?.pet_bottles ?? 0, unit: 'ขวด', color: 'text-azure' },
            { label: 'ฟิวเจอร์บอร์ด', value: stats?.furniture_boards ?? 0, unit: 'แผ่น', color: 'text-azure' },
            { label: 'ถาดพลาสติก', value: stats?.plastic_trays ?? 0, unit: 'ถาด', color: 'text-azure' },
            { label: 'จานพลาสติก', value: stats?.plastic_plates ?? 0, unit: 'จาน', color: 'text-azure' },

            
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

        {/* ===== เส้นทางการแปรรูปวัสดุ (2 คอลัมน์ 2 บรรทัด) ===== */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-slateink">
            เส้นทางการแปรรูป <span className="text-azure">Waste → Transformation</span>
          </h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {materials.map((mat, i) => (
              <motion.article
                key={mat.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  {/* แถบสีบนหัวการ์ดตามสีประจำวัสดุ */}
                  <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: mat.color }} />

                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-4xl sm:text-5xl font-extrabold text-slateink/15 leading-none">
                        0{i + 1}
                      </span>
                      <h4 className="mt-2 text-lg sm:text-xl font-bold text-slateink">{mat.name}</h4>
                      <p className="text-xs font-light text-slateink/60">แหล่งที่มา: {mat.source}</p>
                    </div>

                    {/* สัดส่วนวัสดุ */}
                    {mat.ratio && (
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold tracking-wider"
                        style={{ backgroundColor: `${mat.color}18`, color: mat.color }}
                      >
                        {mat.ratio}%
                      </span>
                    )}
                  </div>

                  {/* คำอธิบายกระบวนการแปรรูป */}
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slateink/[0.03] p-3 border border-slateink/5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: mat.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-slateink/80">{mat.output}</p>
                  </div>

                  {/* แกลเลอรีรูปภาพตัวอย่างวัสดุ (อย่างน้อย 3 รูป) */}
                  <div className="mt-4">
                    <p className="text-[11px] font-medium text-slateink/50 mb-2">ภาพตัวอย่างวัสดุ &amp; ขั้นตอน:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(mat.images && mat.images.length > 0
                        ? mat.images
                        : [null, null, null]
                      ).slice(0, 3).map((imgUrl, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="relative aspect-square overflow-hidden rounded-lg bg-slateink/5 border border-slateink/10 flex items-center justify-center group/img"
                        >
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={`${mat.name} ${imgIdx + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                              onError={(e) => {
                                // ถ้ายังไม่มีรูปจริง ให้แสดง placeholder สวยๆ
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div
                            className={`flex flex-col items-center justify-center p-2 text-center ${
                              imgUrl ? 'hidden' : 'flex'
                            }`}
                          >
                            <svg className="h-5 w-5 text-slateink/30 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span className="text-[10px] text-slateink/40">รูปที่ {imgIdx + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* แถบเปอร์เซ็นต์สัดส่วน */}
                {mat.ratio && (
                  <div className="mt-5 pt-3 border-t border-slateink/5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slateink/60 mb-1.5">
                      <span>สัดส่วนในโครงสร้าง</span>
                      <span style={{ color: mat.color }}>{mat.ratio}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slateink/8">
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
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
