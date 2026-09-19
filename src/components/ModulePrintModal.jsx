// src/components/ModulePrintModal.jsx
// โมดอลศูนย์รวมพิมพ์ QR Code สำหรับติดโมดูลทั้ง 13 ชิ้นงาน
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function ModulePrintModal({ isOpen, onClose, modules = [] }) {
  const [baseUrl, setBaseUrl] = useState('https://nmtc-nova-x.vercel.app');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slateink/80 backdrop-blur-md overflow-y-auto">
        {/* Style สำหรับสั่งพิมพ์ออกเครื่องพิมพ์กระดาษ A4 / ฉลาก */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-qr-area, #printable-qr-area * {
              visibility: visible;
            }
            #printable-qr-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              padding: 10px !important;
            }
            .no-print {
              display: none !important;
            }
            .qr-card-print {
              break-inside: avoid;
              page-break-inside: avoid;
              border: 2px dashed #94a3b8 !important;
              background: white !important;
              color: black !important;
              margin-bottom: 12px !important;
            }
          }
        `}} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-white/30 bg-surface shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Top Bar (No-Print) ── */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between border-b border-slateink/10 bg-white/80 px-6 py-4 gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slateink flex items-center gap-2">
                <span>🖨️</span> พิมพ์แผ่น QR Code โมดูล ({modules.length} ชิ้นงาน)
              </h2>
              <p className="text-xs text-slateink/60 font-light mt-0.5">
                จัดหน้าพร้อมสั่งพิมพ์ลงกระดาษ A4 หรือสติกเกอร์ นำไปตัดแปะติดแต่ละโมดูลได้ทันที
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full bg-azure px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-azure/90 transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
                สั่งพิมพ์ (Print / PDF)
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slateink/5 text-slateink/70 hover:bg-slateink/10 hover:text-slateink transition-colors"
                aria-label="ปิด"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── Domain Config Info (No-Print) ── */}
          <div className="no-print bg-azure/5 border-b border-azure/15 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slateink/80">
              <span className="font-semibold text-azure">Base URL ปลายทาง:</span>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="rounded-lg border border-slateink/20 bg-white px-3 py-1 font-mono text-xs text-slateink focus:border-azure focus:outline-none w-64"
                placeholder="https://nmtc-nova-x.vercel.app"
              />
            </div>
            <span className="text-slateink/60">
              * ลิงก์คงที่ถาวร สามารถอัปเดตรูปภาพและเนื้อหาในเว็บภายหลังได้ตลอดเวลา
            </span>
          </div>

          {/* ── Printable QR Cards Area ── */}
          <div className="flex-1 overflow-y-auto p-6" id="printable-qr-area">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod) => {
                const url = `${baseUrl}/modules/${mod.code}`;
                return (
                  <div
                    key={mod.code}
                    className="qr-card-print flex flex-col items-center justify-between rounded-2xl border-2 border-slateink/20 bg-white p-4 text-center shadow-sm"
                  >
                    {/* Header Card */}
                    <div className="w-full border-b border-slateink/10 pb-2 mb-3">
                      <span className="text-[10px] tracking-wider text-slateink/50 uppercase font-semibold block">
                        NMTC NOVA · IMPACT RE:BUILD
                      </span>
                      <h3 className="text-xl font-extrabold text-slateink tracking-tight mt-0.5">
                        MODULE {mod.code}
                      </h3>
                      <p className="text-xs text-slateink/70 line-clamp-1">
                        {mod.title_th || mod.title}
                      </p>
                    </div>

                    {/* QR Code SVG */}
                    <div className="p-2 bg-white rounded-xl">
                      <QRCodeSVG
                        value={url}
                        size={150}
                        level="H"
                        includeMargin={true}
                      />
                    </div>

                    {/* Footer Info */}
                    <div className="w-full border-t border-slateink/10 pt-2 mt-3">
                      <span className="text-[11px] font-medium text-azure block">
                        เปิดกล้องมือถือสแกนดูรายละเอียด
                      </span>
                      <span className="text-[9px] font-mono text-slateink/50 block break-all">
                        {url}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
