// src/data/mockData.js
// ไฟล์รวมข้อมูลจำลอง ใช้เป็น fallback เมื่อยังไม่ได้เชื่อม Supabase หรือเชื่อมไม่สำเร็จ

// สถิติหลักของโครงการ (map กับตาราง `project_stats` ใน Supabase)
export const mockStats = {
  id: 1,
  recycled_plastic_kg: 1250,   // ปริมาณพลาสติกรีไซเคิลที่นำมาใช้ (กิโลกรัม)
  co2_offset_kg: 3180,         // ปริมาณคาร์บอนที่ลดได้ (กิโลกรัม)
  pet_bottles: 100000,          // จำนวนขวด PET ที่แปรรูป
  vinyl_banner_sqm: 860,       // ไวนิลป้ายโฆษณา (ตารางเมตร)
  plastic_cups: 28500,         // จำนวนแก้วพลาสติกจากงานอีเวนต์
  furniture_boards: 0,         // ฟิวเจอร์บอร์ด (แผ่น)
  plastic_trays: 0,            // ถาดพลาสติก (ถาด)
  plastic_plates: 0,           // จานพลาสติก (จาน)
  updated_at: '2026-09-01T09:00:00Z',
};

// เรื่องราวการแปรรูปวัสดุ (map กับตาราง `materials`)
export const mockMaterials = [
  {
    id: 1,
    name: 'ฝาขวด PET จากงานแสดงสินค้า',
    source: 'เก็บไปเรื่อย',
    output: 'กลายมาเป็นแผ่นโครงสร้างโมดูลที่นั่งและกระบะต้นไม้',
    ratio: 46,
    color: '#0284C7',
    icon: 'bottle',
  },
  {
    id: 2,
    name: 'เหล็กกล่อง',
    source: 'ไทยวัสดุ',
    output: 'ชั้นแกนกลางเสริมแรง (Core Layer) ของโมดูล',
    ratio: 31,
    color: '#F59E0B',
    icon: 'metal',
  },
  {
    id: 3,
    name: 'น็อต',
    source: 'ไทยวัสดุ',
    output: 'ยึดชั้นโครงสร้างโมดูลเข้าด้วยกัน',
    ratio: 23,
    color: '#06B6D4',
    icon: 'nut',
  },
];

// โมดูลโครงสร้าง 3 ชิ้น (map กับตาราง `modules`)
export const mockModules = [
  {
    id: 'A',
    code: 'MODULE A',
    title: 'SEAT',
    title_th: 'โมดูลที่นั่ง',
    desc: 'ที่นั่งโครงสร้างจากพลาสติกรีไซเคิลความหนาแน่นสูง รับน้ำหนักได้ 250 กก./จุด ผิวสัมผัสเทอราซโซกันลื่น ทนแดดทนฝนตลอดปี',
    specs: ['450 × 450 × 450 มม.', 'rHDPE ความหนาแน่นสูง', 'รับน้ำหนัก 250 กก.'],
    accent: '#0284C7',
    tone: 'azure',
  },
  {
    id: 'B',
    code: 'MODULE B',
    title: 'PLANTER',
    title_th: 'โมดูลกระบะต้นไม้',
    desc: 'กระบะปลูกพืชพร้อมระบบระบายน้ำสองชั้นและแผ่นกักความชื้น ช่วยเพิ่มพื้นที่สีเขียวและลดอุณหภูมิผิวรอบประติมากรรม',
    specs: ['450 × 450 × 600 มม.', 'ระบบระบายน้ำ 2 ชั้น', 'พืชทนแดด Low Maintenance'],
    accent: '#F59E0B',
    tone: 'gold',
  },
  {
    id: 'C',
    code: 'MODULE C',
    title: 'LIGHT',
    title_th: 'โมดูลไฟอัจฉริยะ',
    desc: 'โครงสร้างไฟ LED พร้อม Motion Sensor ตรวจจับผู้เข้าใช้งาน ปรับความสว่างอัตโนมัติ 4 ระดับ',
    specs: ['สามเหลี่ยม 600 มม.', 'PIR Motion Sensor', 'Solar + Li-ion 12V'],
    accent: '#06B6D4',
    tone: 'cyan',
  },
];

// โหมดแสงสำหรับ Interactive Viewport ใน Hero
export const lightingModes = [
  { key: 'standby', label: 'Standby', label_th: 'พร้อมใช้งาน', brightness: 25, color: '#0284C7', desc: 'ไฟหรี่ประหยัดพลังงาน รอการตรวจจับ' },
  { key: 'active', label: 'Active', label_th: 'ใช้งานจริง', brightness: 90, color: '#F59E0B', desc: 'ไฟเต็มระดับสำหรับนั่งพักและอ่านหนังสือ' },
];

// จุด Hotspot บอกมิติของประติมากรรม (ตำแหน่งเป็น % ของ container)
export const hotspots = [
  { id: 'w', label: 'กว้าง', value: '3.00 m', x: 50, y: 88 },
  { id: 'h', label: 'สูง', value: '2.00 m', x: 8, y: 45 },
  { id: 'd', label: 'ลึก', value: '2.00 m', x: 88, y: 78 },
];

// รายชื่อทีมและที่ปรึกษา (map กับตาราง `team_members`)
export const mockTeam = [
  { id: 1, name: 'ณัฐวุฒิ ศรีสุวรรณ', role: 'Team Lead / Concept Design', org: 'คณะสถาปัตยกรรมศาสตร์', type: 'member', initials: 'ณศ' },
  { id: 2, name: 'พิมพ์ชนก วัฒนกุล', role: 'Material Research', org: 'คณะวิศวกรรมศาสตร์', type: 'member', initials: 'พว' },
  { id: 3, name: 'ธีรภัทร อินทรโชติ', role: 'Structural Engineer', org: 'คณะวิศวกรรมศาสตร์', type: 'member', initials: 'ธอ' },
  { id: 4, name: 'ศิริพร มณีรัตน์', role: 'Smart Lighting & IoT', org: 'คณะเทคโนโลยีสารสนเทศ', type: 'member', initials: 'ศม' },
  { id: 5, name: 'รศ.ดร. สมชาย ทองประเสริฐ', role: 'อาจารย์ที่ปรึกษาหลัก', org: 'ภาควิชาสถาปัตยกรรม', type: 'advisor', initials: 'สท' },
  { id: 6, name: 'ผศ.ดร. อรวรรณ เจริญสุข', role: 'ที่ปรึกษาด้านวัสดุยั่งยืน', org: 'ภาควิชาวัสดุศาสตร์', type: 'advisor', initials: 'อจ' },
];

// เมนูนำทางหลัก — ใช้ path สำหรับ React Router
export const navLinks = [
  { to: '/',          label: 'หน้าแรก' },
  { to: '/materials', label: 'Material Passport' },
  { to: '/modules',   label: 'โมดูลโครงสร้าง' },
  { to: '/sponsor',   label: 'ผู้สนับสนุนหลัก' },
  { to: '/team',      label: 'ทีมงาน' },
];