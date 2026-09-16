// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // ระบุไฟล์ที่ให้ Tailwind สแกนหา class เพื่อ generate CSS
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Anakotmai เป็นฟอนต์หลักของทั้งระบบ (ใช้ class font-anakotmai หรือ font-sans)
        anakotmai: ['Anakotmai', 'system-ui', 'sans-serif'],
        sans: ['Anakotmai', 'system-ui', 'sans-serif'],
      },
      colors: {
        // พาเลตต์สีตามคอนเซ็ปต์ Bright Luxury & Futuristic Innovation
        surface: '#F8FAFC',     // สีพื้นหลัก 40% — ขาวน้ำแข็งนุ่มตา
        azure: '#0284C7',     // สีรอง 30% — ฟ้าสดใส ใช้กับการ์ด/หัวข้อย่อย/เส้นขอบเทค
        champagne: '#F59E0B', // สีไฮไลต์ 10% — ทองแชมเปญ ใช้กับ CTA และขอบเรืองแสง
        cyanglow: '#06B6D4',  // สีเสริม — ไซแอนสำหรับไฟ LED เซ็นเซอร์
        slateink: '#0F172A',  // สีตัวอักษรคอนทราสต์สูง
      },
      boxShadow: {
        // เงาเรืองแสงสำหรับการ์ดกระจก
        gold: '0 0 24px -4px rgba(245,158,11,0.55)',
        azure: '0 0 24px -4px rgba(2,132,199,0.45)',
        cyan: '0 0 28px -2px rgba(6,182,212,0.55)',
      },
      backdropBlur: { xs: '2px' },
      animation: {
        // อนิเมชันพื้นฐานที่เรียกใช้ซ้ำได้
        'pulse-slow': 'pulse 2.1s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 3.6s ease-in-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
