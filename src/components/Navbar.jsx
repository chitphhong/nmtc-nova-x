// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { navLinks } from '../data/mockdata';

export default function Navbar() {
  // state: เปิด/ปิดเมนู Drawer บนมือถือ
  const [isOpen, setIsOpen] = useState(false);
  // state: บอกว่า scroll ลงมาแล้วหรือยัง (ใช้เปลี่ยนพื้นหลัง Navbar)
  const [scrolled, setScrolled] = useState(false);

  // ผูก event scroll เพื่ออัปเดตสถานะ scrolled (ใช้ passive เพื่อประสิทธิภาพ)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll); // cleanup กัน memory leak
  }, []);

  // ล็อกการเลื่อนพื้นหลังเมื่อเปิด Drawer
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ปิด Drawer เมื่อกดปุ่ม Escape (เพิ่ม accessibility)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setIsOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // class สำหรับ active link ใน desktop menu
  const navLinkClass = ({ isActive }) =>
    `relative inline-flex min-h-[44px] items-center rounded-full px-3 xl:px-4 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'text-azure bg-azure/8 font-semibold'
        : 'text-slateink/75 hover:text-azure hover:bg-azure/5'
    }`;

  return (
    <>
      {/* แถบนำทางแบบ fixed พร้อมเอฟเฟกต์กระจก เปลี่ยนความทึบตามการ scroll */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-azure/10 shadow-sm'
            : 'bg-white border-b border-azure/10 shadow-sm'
        }`}
      >
        {/* padding แบบไล่ระดับตามขนาดจอ */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* โลโก้ / ชื่อโครงการ — ใช้ Link ไป "/" */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
              <img
                src="/Impact_Muang_Thong_Thani_Logo.svg"
                alt="IMPACT RE:BUILD"
                className="h-12 w-13 sm:h-12 sm:w-13"
              />
              <span className="leading-tight">
                <span className="block text-base sm:text-lg font-bold tracking-tight text-slateink">
                  <span className="text-azure">RE BUILD</span>
                </span>
                <span className="hidden sm:block text-[10px] font-light tracking-[0.2em] text-slateink/60">
                  FROM WASTE TO WONDER
                </span>
              </span>
            </Link>

            {/* เมนูสำหรับเดสก์ท็อป — ซ่อนบนจอเล็ก แสดงตั้งแต่ lg ขึ้นไป */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  {/* NavLink จะเพิ่ม class active อัตโนมัติเมื่อ route ตรง */}
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}  // "end" ป้องกัน "/" match ทุก route
                    className={navLinkClass}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* กลุ่มปุ่มด้านขวา */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* ปุ่มแฮมเบอร์เกอร์ — แสดงเฉพาะจอเล็กกว่า lg */}
              <button
                onClick={() => setIsOpen(true)}
                aria-label="เปิดเมนูนำทาง"
                aria-expanded={isOpen}
                className="lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-azure/25 bg-white/70 text-slateink backdrop-blur transition-colors active:scale-95"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ===== Drawer เมนูมือถือแบบ Glassmorphic ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ฉากหลังมืดโปร่ง กดแล้วปิดเมนู */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-slateink/45 backdrop-blur-sm lg:hidden"
            />
            {/* แผงเมนูเลื่อนเข้าจากขวา */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 z-[70] h-full w-[86%] max-w-sm bg-white/85 backdrop-blur-2xl border-l border-champagne/40 shadow-2xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5 border-b border-slateink/10">
                <span className="font-semibold text-slateink">เมนูนำทาง</span>
                {/* ปุ่มปิด Drawer ขนาด 44px ตามกฎ touch target */}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="ปิดเมนู"
                  className="grid h-11 w-11 place-items-center rounded-xl text-slateink/70 hover:bg-slateink/5"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* รายการเมนู — ใช้ stagger ให้แต่ละรายการไล่กันเข้ามา */}
              <ul className="flex flex-col gap-1 p-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setIsOpen(false)} // ปิดเมนูทันทีหลังเลือก
                      className={({ isActive }) =>
                        `flex min-h-[52px] items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-azure/8 text-azure'
                            : 'text-slateink/85 hover:bg-azure/8 hover:text-azure'
                        }`
                      }
                    >
                      {link.label}
                      <svg className="h-4 w-4 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* ข้อมูลโครงการท้าย Drawer */}
              <div className="absolute bottom-0 inset-x-0 p-5 border-t border-slateink/10 bg-gradient-to-t from-azure/5 to-transparent">
                <p className="text-xs font-light text-slateink/60 leading-relaxed">
                  โครงการ IMPACT RE:BUILD<br />
                  ภายใต้การแข่งขัน IMPACT Rise Up Competition
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
