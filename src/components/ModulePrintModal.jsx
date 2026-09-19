// src/components/ModulePrintModal.jsx
// โมดอลศูนย์รวมดาวน์โหลดและพิมพ์ QR Code สำหรับติดโมดูลทั้ง 17 ชิ้นงาน
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import JSZip from 'jszip';

export default function ModulePrintModal({ isOpen, onClose, modules = [] }) {
  const [baseUrl, setBaseUrl] = useState('https://nmtc-nova-x.vercel.app');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  if (!isOpen) return null;

  // ฟังก์ชันวาดการ์ดให้ออกมาเหมือนภาพต้นแบบในระดับความคมชัดสูง (2x Retina)
  const generateCardCanvas = (mod) => {
    const url = `${baseUrl}/modules/${mod.code}`;
    const width = 480;
    const height = 580;
    const scale = 2; // High-DPI 2x
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // สีพื้นหลังขาว
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // กรอบการ์ดมน
    const cardX = 14;
    const cardY = 14;
    const cardW = width - 28;
    const cardH = height - 28;
    const radius = 24;

    ctx.beginPath();
    ctx.moveTo(cardX + radius, cardY);
    ctx.lineTo(cardX + cardW - radius, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius);
    ctx.lineTo(cardX + cardW, cardY + cardH - radius);
    ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH);
    ctx.lineTo(cardX + radius, cardY + cardH);
    ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius);
    ctx.lineTo(cardX, cardY + radius);
    ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
    ctx.closePath();

    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#CBD5E1'; // สีขอบการ์ดเทาอ่อน
    ctx.stroke();

    // 1. หัวเรื่องย่อยบนสุด
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#64748B';
    ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('NMTC NOVA · IMPACT RE:BUILD', width / 2, 48);

    // 2. ชื่อรหัสโมดูลตัวหนาใหญ่ (MODULE A1)
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`MODULE ${mod.code}`, width / 2, 84);

    // 3. ชื่อโมดูลภาษาไทย
    ctx.fillStyle = '#475569';
    ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Thai", "Thonburi", sans-serif';
    ctx.fillText(mod.title_th || mod.title, width / 2, 116);

    // เส้นคั่นบน
    ctx.beginPath();
    ctx.moveTo(cardX + 24, 142);
    ctx.lineTo(cardX + cardW - 24, 142);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. วาดภาพ QR Code จาก Canvas ใน DOM
    const qrCanvas = document.getElementById(`qr-canvas-${mod.code}`);
    const qrSize = 250;
    const qrX = (width - qrSize) / 2;
    const qrY = 162;
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
    }

    // เส้นคั่นล่าง
    ctx.beginPath();
    ctx.moveTo(cardX + 24, 436);
    ctx.lineTo(cardX + cardW - 24, 436);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 5. ข้อความเชิญชวนสแกนสีฟ้า
    ctx.fillStyle = '#0284C7';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Thai", "Thonburi", sans-serif';
    ctx.fillText('เปิดกล้องมือถือสแกนดูรายละเอียด', width / 2, 464);

    // 6. ลิงก์ URL ตัวอักษร Monospace
    ctx.fillStyle = '#64748B';
    ctx.font = '400 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.fillText(url, width / 2, 492);

    return canvas;
  };

  // ดาวน์โหลดรูปภาพเดี่ยวเป็นไฟล์ PNG
  const handleDownloadSingle = (mod) => {
    const canvas = generateCardCanvas(mod);
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `QR-Card-MODULE-${mod.code}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ดาวน์โหลดรูปภาพทั้งหมด 17 รูปเป็นไฟล์ ZIP
  const handleDownloadAllZip = async () => {
    setIsDownloadingAll(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('QR-Cards-NMTC-NOVA');

      for (let i = 0; i < modules.length; i++) {
        const mod = modules[i];
        const canvas = generateCardCanvas(mod);
        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
        folder.file(`QR-Card-MODULE-${mod.code}.png`, base64, { base64: true });
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `QR-Cards-All-${modules.length}-Modules.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download all zip error:', err);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slateink/80 backdrop-blur-md overflow-y-auto">
        {/* Style สำหรับคำสั่ง Print */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * { visibility: hidden; }
            #printable-qr-area, #printable-qr-area * { visibility: visible; }
            #printable-qr-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              padding: 10px !important;
            }
            .no-print { display: none !important; }
            .qr-card-print {
              break-inside: avoid;
              page-break-inside: avoid;
              background: white !important;
              color: black !important;
              margin-bottom: 16px !important;
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
          {/* ── Top Bar ── */}
          <div className="no-print flex flex-col md:flex-row md:items-center justify-between border-b border-slateink/10 bg-white/90 px-6 py-4 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slateink flex items-center gap-2">
                <span>🏷️</span> การ์ด QR Code โมดูล ({modules.length} ชิ้นงาน)
              </h2>
              <p className="text-xs text-slateink/60 font-light mt-0.5">
                ดีไซน์ตามมาตรฐานพร้อมบันทึกเป็นรูปภาพ PNG คมชัดสูง (2x Retina) นำไปใช้งานได้ทันที
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* ปุ่มดาวน์โหลดไฟล์ ZIP ครบ 17 รูป */}
              <button
                type="button"
                onClick={handleDownloadAllZip}
                disabled={isDownloadingAll}
                className="inline-flex items-center gap-2 rounded-full bg-azure px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-azure/90 transition-all disabled:opacity-50"
              >
                {isDownloadingAll ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>กำลังรวมไฟล์ ZIP...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    <span>ดาวน์โหลดรูปทั้งหมด ({modules.length} รูป .ZIP)</span>
                  </>
                )}
              </button>

              {/* ปุ่มพิมพ์กระดาษ */}
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full border border-slateink/20 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slateink hover:bg-slateink/5 transition-all"
              >
                <span>🖨️</span>
                <span>สั่งพิมพ์</span>
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

          {/* ── Base URL Settings ── */}
          <div className="no-print bg-azure/5 border-b border-azure/15 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
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
              💡 คลิกปุ่ม <b>"บันทึกรูปนี้ (PNG)"</b> ใต้การ์ดแต่ละใบ หรือกดดาวน์โหลดรวมด้านบน
            </span>
          </div>

          {/* ── QR Cards Grid Area ── */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50" id="printable-qr-area">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod) => {
                const url = `${baseUrl}/modules/${mod.code}`;
                return (
                  <div
                    key={mod.code}
                    className="flex flex-col items-center"
                  >
                    {/* ── The Exact Card Container Matching User Template ── */}
                    <div className="qr-card-print w-full flex flex-col items-center rounded-[24px] border-2 border-slate-300 bg-white p-5 text-center shadow-sm">
                      {/* Top text */}
                      <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block">
                        NMTC NOVA · IMPACT RE:BUILD
                      </span>

                      {/* Main Title */}
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                        MODULE {mod.code}
                      </h3>

                      {/* Thai subtitle */}
                      <p className="text-sm font-medium text-slate-600 mt-0.5 line-clamp-1">
                        {mod.title_th || mod.title}
                      </p>

                      {/* Divider top */}
                      <div className="w-full h-px bg-slate-200 my-3" />

                      {/* QR Code Canvas */}
                      <div className="py-1">
                        <QRCodeCanvas
                          id={`qr-canvas-${mod.code}`}
                          value={url}
                          size={190}
                          level="H"
                          includeMargin={false}
                        />
                      </div>

                      {/* Divider bottom */}
                      <div className="w-full h-px bg-slate-200 my-3" />

                      {/* CTA Text */}
                      <span className="text-sm font-bold text-sky-600 block">
                        เปิดกล้องมือถือสแกนดูรายละเอียด
                      </span>

                      {/* URL Text */}
                      <span className="text-[11px] font-mono text-slate-500 block break-all mt-0.5">
                        {url}
                      </span>
                    </div>

                    {/* Action Button: Save Single Image */}
                    <div className="no-print mt-2.5 w-full flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(mod)}
                        className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl border border-azure/30 bg-white py-2 px-3 text-xs font-semibold text-azure shadow-sm hover:bg-azure hover:text-white transition-all"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        บันทึกรูปนี้ (PNG)
                      </button>
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
