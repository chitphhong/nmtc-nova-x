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
    name: 'ฝาขวดน้ำ PET',
    source: 'งานแสดงสินค้า',
    output: 'นำมาหลอมพลาสติกให้เป็นแผ่นสำหรับโมดูลที่นั่ง',
    ratio: 40,
    color: '#0284C7',
    icon: 'bottle',
    images: [
      '/materials/pet-1.jpg',
      '/materials/pet-2.jpg',
      '/materials/pet-3.jpg',
    ],
  },
  {
    id: 2,
    name: 'ฟิวเจอร์บอร์ด',
    source: 'งานอีเว้นท์ต่าง ๆ',
    output: 'นำมาตัดแต่ง ขึ้นรูปเป็นโลโก้ Impact',
    ratio: 25,
    color: '#F59E0B',
    icon: 'board',
    images: [
      '/materials/board-1.jpg',
      '/materials/board-2.jpg',
      '/materials/board-3.jpg',
    ],
  },
  {
    id: 3,
    name: 'ถาดพลาสติกเหลือใช้',
    source: 'งานจัดเลี้ยงและกิจกรรม',
    output: 'นำมาประกอบตกแต่งพร้อมกับโครงสร้างของแต่ละโมดูล',
    ratio: 20,
    color: '#06B6D4',
    icon: 'tray',
    images: [
      '/materials/tray-1.jpg',
      '/materials/tray-2.jpg',
      '/materials/tray-3.jpg',
    ],
  },
  {
    id: 4,
    name: 'จานพลาสติก',
    source: 'โซนอาหารและเครื่องดื่ม',
    output: 'นำมาปรับแต่งให้เป็นกระถางต้นไม้สไตล์ minimal',
    ratio: 15,
    color: '#10B981',
    icon: 'plate',
    images: [
      '/materials/plate-1.jpg',
      '/materials/plate-2.jpg',
      '/materials/plate-3.jpg',
    ],
  },
];

// โมดูลโครงสร้างทั้งหมด 13 รายการ (map กับตาราง `modules` ใน Supabase)
export const mockModules = [
  {
    id: 'A1',
    code: 'A1',
    title: 'MODULE A1',
    title_th: 'โมดูลลูกบาศก์หลัก A1',
    category: 'Cube System',
    category_th: 'โครงสร้างลูกบาศก์ (4 Cube)',
    desc: 'โครงสร้างลูกบาศก์ 4 ช่อง (4 Cube) เป็นแกนหลักสำหรับรองรับการจัดวางและเชื่อมต่อโมดูลอื่น ๆ',
    specs: ['โครงสร้าง 4 Cube', 'โลหะเคลือบกันสนิม 110cm & 55cm', 'แผ่นพลาสติกรีไซเคิล rHDPE 2 แผ่น'],
    components: [
      { name: 'Cube', qty: 4, unit: 'cube', category: 'structure' },
      { name: 'Metal 110cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Metal 55cm', qty: 9, unit: 'line', category: 'metal' },
      { name: 'Fitting L hole', qty: 4, unit: 'item', category: 'fitting' },
      { name: 'Fitting L fill', qty: 8, unit: 'item', category: 'fitting' },
      { name: 'Fitting T hole', qty: 2, unit: 'item', category: 'fitting' },
      { name: 'Fitting T fill', qty: 4, unit: 'item', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 2, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#0284C7',
    tone: 'azure',
    images: [],
  },
  {
    id: 'A2',
    code: 'A2',
    title: 'MODULE A2',
    title_th: 'โมดูลลูกบาศก์หลัก A2',
    category: 'Cube System',
    category_th: 'โครงสร้างลูกบาศก์ (4 Cube)',
    desc: 'โครงสร้างลูกบาศก์ 4 ช่อง (4 Cube) โมดูลคู่ขนานสำหรับกระจายน้ำหนักและเสริมความแข็งแรงของประติมากรรม',
    specs: ['โครงสร้าง 4 Cube', 'โลหะเคลือบกันสนิม 110cm & 55cm', 'แผ่นพลาสติกรีไซเคิล rHDPE 2 แผ่น'],
    components: [
      { name: 'Cube', qty: 4, unit: 'cube', category: 'structure' },
      { name: 'Metal 110cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Metal 55cm', qty: 9, unit: 'line', category: 'metal' },
      { name: 'Fitting L hole', qty: 4, unit: 'item', category: 'fitting' },
      { name: 'Fitting L fill', qty: 8, unit: 'item', category: 'fitting' },
      { name: 'Fitting T hole', qty: 2, unit: 'item', category: 'fitting' },
      { name: 'Fitting T fill', qty: 4, unit: 'item', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 2, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#0284C7',
    tone: 'azure',
    images: [],
  },
  {
    id: 'B1',
    code: 'B1',
    title: 'MODULE B1',
    title_th: 'โมดูลเชื่อมต่อแนวแกน B1',
    category: 'Linear Frame',
    category_th: 'โครงสร้างแนวเชื่อมต่อ',
    desc: 'โมดูลโครงเชื่อมโยงระดับแกนแนวตั้งและแนวนอน รองรับแผ่นผิววัสดุรีไซเคิลและเชื่อมระนาบ',
    specs: ['เสาโลหะ 110cm x 4 เส้น', 'คานโลหะ 55cm x 12 เส้น', 'แผ่นพลาสติก rHDPE 1 แผ่น'],
    components: [
      { name: 'Metal 110cm', qty: 4, unit: 'line', category: 'metal' },
      { name: 'Metal 55cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Fitting L hole', qty: 4, unit: 'item', category: 'fitting' },
      { name: 'Fitting L fill', qty: 8, unit: 'item', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 1, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#F59E0B',
    tone: 'gold',
    images: [],
  },
  {
    id: 'C1',
    code: 'C1',
    title: 'MODULE C1',
    title_th: 'โมดูลกะทัดรัด C1',
    category: 'Compact Cube',
    category_th: 'ลูกบาศก์ย่อยมาตรฐาน (55cm)',
    desc: 'โมดูลลูกบาศก์ขนาด 55cm สำหรับจัดวางในระนาบต่างระดับเพื่อความหลากหลายของรูปทรง',
    specs: ['โครงโลหะ 55cm x 12 เส้น', 'ฟิตติ้งข้อต่อ Fitting L fill x 8', 'แผ่นพลาสติก rHDPE 1 แผ่น'],
    components: [
      { name: 'Metal 55cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Fitting L fill', qty: 8, unit: 'item', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 1, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#06B6D4',
    tone: 'cyan',
    images: [],
  },
  {
    id: 'C2',
    code: 'C2',
    title: 'MODULE C2',
    title_th: 'โมดูลกะทัดรัด C2',
    category: 'Compact Cube',
    category_th: 'ลูกบาศก์ย่อยมาตรฐาน (55cm)',
    desc: 'โมดูลลูกบาศก์ขนาด 55cm สำหรับติดตั้งพื้นผิวและเชื่อมต่อไปยังจุดแสดงผล',
    specs: ['โครงโลหะ 55cm x 12 เส้น', 'ฟิตติ้งข้อต่อ Fitting L fill x 8', 'แผ่นพลาสติก rHDPE 1 แผ่น'],
    components: [
      { name: 'Metal 55cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Fitting L fill', qty: 8, unit: 'item', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 1, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#06B6D4',
    tone: 'cyan',
    images: [],
  },
  {
    id: 'C3',
    code: 'C3',
    title: 'MODULE C3',
    title_th: 'โมดูลกะทัดรัด C3',
    category: 'Compact Cube',
    category_th: 'ลูกบาศก์ย่อยมาตรฐาน (55cm)',
    desc: 'โมดูลลูกบาศก์ขนาด 55cm สำหรับรองรับชิ้นงานประดับและสร้างมิติแสงเงา',
    specs: ['โครงโลหะ 55cm x 12 เส้น', 'ฟิตติ้งข้อต่อ Fitting L fill x 8', 'แผ่นพลาสติก rHDPE 1 แผ่น'],
    components: [
      { name: 'Metal 55cm', qty: 12, unit: 'line', category: 'metal' },
      { name: 'Fitting L fill', qty: 8, unit: 'line', category: 'fitting' },
      { name: 'Plastic 60×60cm', qty: 1, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#06B6D4',
    tone: 'cyan',
    images: [],
  },
  {
    id: 'D1',
    code: 'D1',
    title: 'MODULE D1',
    title_th: 'โมดูลฐานทรงเตี้ย D1',
    category: 'Low-profile Frame',
    category_th: 'โครงสร้างเสริมระดับเตี้ย',
    desc: 'โมดูลขนาดสัดส่วนพิเศษ โครงโลหะ 55cm ผสาน 30cm เพื่อปรับระดับความลาดเอียงและถ่ายเทน้ำหนัก',
    specs: ['โลหะ 55cm x 8 เส้น', 'โลหะ 30cm x 4 เส้น', 'แผ่นพลาสติก rHDPE 1 แผ่น'],
    components: [
      { name: 'Metal 55cm', qty: 8, unit: 'line', category: 'metal' },
      { name: 'Metal 30cm', qty: 4, unit: 'line', category: 'metal' },
      { name: 'Plastic 60×60cm', qty: 1, unit: 'sheet', category: 'plastic' },
    ],
    accent: '#8B5CF6',
    tone: 'azure',
    images: [],
  },
  {
    id: 'Triangle1',
    code: 'Triangle1',
    title: 'MODULE Triangle 1',
    title_th: 'โมดูลสามเหลี่ยมตาข่าย 1',
    category: 'Triangular System',
    category_th: 'แผงตาข่ายเรขาคณิตสามเหลี่ยม',
    desc: 'แผงสามเหลี่ยมโครงตาข่าย Wire Mesh บุด้วยผ้า Tablecloth สร้างเลเยอร์ผิวสัมผัสและการกรองแสง',
    specs: ['Wire Mesh ตาข่ายลวด 1 ชิ้น', 'ผ้าคลุม Tablecloth 2 ผืน', 'โครงรูปทรงสามเหลี่ยม'],
    components: [
      { name: 'Wire Mesh', qty: 1, unit: 'item', category: 'mesh' },
      { name: 'Tablecloth', qty: 2, unit: 'piece', category: 'fabric' },
    ],
    accent: '#EC4899',
    tone: 'gold',
    images: [],
  },
  {
    id: 'Triangle2',
    code: 'Triangle2',
    title: 'MODULE Triangle 2',
    title_th: 'โมดูลสามเหลี่ยมตาข่าย 2',
    category: 'Triangular System',
    category_th: 'แผงตาข่ายเรขาคณิตสามเหลี่ยม',
    desc: 'แผงสามเหลี่ยมตาข่ายลวดและผ้าคลุม ช่วยเสริมความนุ่มนวลให้รูปทรงและใช้เป็นจุดสะท้อนแสงไฟ',
    specs: ['Wire Mesh ตาข่ายลวด 1 ชิ้น', 'ผ้าคลุม Tablecloth 2 ผืน', 'โครงรูปทรงสามเหลี่ยม'],
    components: [
      { name: 'Wire Mesh', qty: 1, unit: 'item', category: 'mesh' },
      { name: 'Tablecloth', qty: 2, unit: 'piece', category: 'fabric' },
    ],
    accent: '#EC4899',
    tone: 'gold',
    images: [],
  },
  {
    id: 'Triangle3',
    code: 'Triangle3',
    title: 'MODULE Triangle 3',
    title_th: 'โมดูลสามเหลี่ยมพับได้ 3',
    category: 'Triangular System',
    category_th: 'แผงพลาสติกสามเหลี่ยมบานพับ',
    desc: 'แผงพลาสติกรีไซเคิล 3 แผ่น เชื่อมโยงด้วยบานพับ Hinge 6 ชิ้น ปรับมุมองศาและรูปทรงได้แบบ Adaptive',
    specs: ['แผ่นพลาสติก rHDPE 3 แผ่น', 'บานพับ Hinge 6 ชิ้น', 'ปรับมุมบิดและพับองศาได้'],
    components: [
      { name: 'Plastic 60×60cm', qty: 3, unit: 'sheet', category: 'plastic' },
      { name: 'Hinge', qty: 6, unit: 'item', category: 'hardware' },
    ],
    accent: '#F97316',
    tone: 'gold',
    images: [],
  },
  {
    id: 'Plants',
    code: 'Plants',
    title: 'MODULE Plants',
    title_th: 'โมดูลพืชพันธุ์สีเขียว (6 จุด)',
    category: 'Biophilic System',
    category_th: 'พื้นที่สีเขียวและการดูดซับมลพิษ',
    desc: 'ชุดกระถางพืชพรรณดูดซับมลพิษ 6 ยูนิต เสริมความสดชื่นและสะท้อนแนวคิด Green Meetings & Biophilic Design',
    specs: ['ชุดกระถางต้นไม้ 6 ยูนิต', 'พืชดูดสารพิษและฟอกอากาศ', 'ระบบกักเก็บความชื้น'],
    components: [
      { name: 'Plants Modules Unit', qty: 6, unit: 'units', category: 'nature' },
    ],
    accent: '#10B981',
    tone: 'cyan',
    images: [],
  },
  {
    id: 'Hexagon',
    code: 'Hexagon',
    title: 'MODULE Hexagon',
    title_th: 'โมดูลหกเหลี่ยมเรขาคณิต (2 จุด)',
    category: 'Geometric Accent',
    category_th: 'โครงสร้างหกเหลี่ยมตกแต่ง',
    desc: 'โครงสร้างหกเหลี่ยม 2 ชุด เพิ่มมิติทางสถาปัตยกรรมและการสะท้อนแสงเงาให้กับประติมากรรม',
    specs: ['ชุดโครงสร้าง Hexagon 2 ยูนิต', 'รูปทรงรังผึ้งถ่ายเทแรงได้ดี', 'โมดูลถอดประกอบอิสระ'],
    components: [
      { name: 'Hexagon Modules Unit', qty: 2, unit: 'units', category: 'structure' },
    ],
    accent: '#6366F1',
    tone: 'azure',
    images: [],
  },
  {
    id: 'Lighting',
    code: 'Lighting',
    title: 'MODULE LED Strip Light',
    title_th: 'โมดูลระบบไฟเส้น LED อัจฉริยะ',
    category: 'Smart Electrical',
    category_th: 'ระบบแสงสว่างพลังงานต่ำ',
    desc: 'ระบบไฟเส้น LED Strip Light เดินสายรอบโครงสร้างโมดูล เพิ่มความโดดเด่นในเวลากลางคืน พร้อมระบบประหยัดพลังงาน',
    specs: ['LED Strip Light เส้นแสงรอบโครง', 'Driver ควบคุมกระแสไฟ', 'โหมดไฟส่องสว่างนวัตกรรม'],
    components: [
      { name: 'LED strip light', qty: 1, unit: 'set', category: 'electrical' },
    ],
    accent: '#FBBF24',
    tone: 'gold',
    images: [],
  },
];

// โหมดแสงสำหรับ Interactive Viewport ใน Hero
export const lightingModes = [
  { key: 'standby', label: 'Off', label_th: 'ปิด', brightness: 0, color: '#0284C7', desc: 'ปิดไฟ' },
  { key: 'active', label: 'On', label_th: 'เปิด', brightness: 100, color: '#F59E0B', desc: 'เปิดไฟเต็มระดับ' },
];

// จุด Hotspot บอกมิติของประติมากรรม (ตำแหน่งเป็น % ของ container)
export const hotspots = [
  { id: 'w', label: 'กว้าง', value: '3.00 m', x: 50, y: 88 },
  { id: 'h', label: 'สูง', value: '1.80 m', x: 8, y: 45 },
  { id: 'd', label: 'ลึก', value: '1.80 m', x: 88, y: 78 },
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
  { to: '/',          label: 'Home' },
  { to: '/materials', label: 'Materials' },
  { to: '/modules',   label: 'Modules' },
  { to: '/sponsor',   label: 'Sponsor' },
  { to: '/team',      label: 'Team' },
];