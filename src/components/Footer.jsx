// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../data/mockdata';

export default function Footer() {
  return (
    <footer className="border-t border-slateink/10 bg-slateink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-10 sm:py-14">
        {/* จัดวาง 1 คอลัมน์บนมือถือ → 3 คอลัมน์ตั้งแต่ md */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xl font-bold">
              IMPACT <span className="text-champagne">RE:BUILD</span>
            </p>
            <p className="mt-2 text-xs font-light tracking-[0.2em] text-cyanglow">
              FROM WASTE TO WONDER
            </p>
            <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-white/55">
              ประติมากรรมใช้งานได้จริงจากขยะพลาสติกในงานอีเวนต์ ขนาด 3.00 × 2.00 × 2.00 เมตร
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-champagne">เมนู</p>
            <ul className="mt-3 space-y-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  {/* ใช้ Link จาก react-router-dom แทน <a> */}
                  <Link
                    to={l.to}
                    className="inline-flex min-h-[40px] items-center text-xs font-light text-white/60 transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-champagne">ผู้สนับสนุนหลัก</p>
            <p className="mt-3 text-xs font-light leading-relaxed text-white/60">
              ศูนย์แสดงสินค้าและการประชุม<br />
              อิมแพ็ค เมืองทองธานี<br />
              <span className="text-cyanglow">Green Meetings &amp; Sustainable Events</span>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-[11px] font-light text-white/40">
            © 2026 IMPACT RE:BUILD · IMPACT Rise Up Competition
          </p>
        </div>
      </div>
    </footer>
  );
}
