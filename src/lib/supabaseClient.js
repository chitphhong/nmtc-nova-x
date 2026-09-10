// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// ดึงค่า URL และ Anon Key จากไฟล์ .env (Vite ต้องขึ้นต้นด้วย VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// ตรวจสอบว่ามีค่า env ครบหรือไม่
const isSupabaseReady = supabaseUrl && supabaseKey;

// สร้าง client เฉพาะเมื่อมี env ครบ เพื่อกัน error ตอน build/dev
export const supabase = isSupabaseReady
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }, // เว็บนี้เป็น public read-only ไม่ต้องเก็บ session
    })
  : null;

/**
 * ฟังก์ชันกลางสำหรับดึงข้อมูลจาก Supabase พร้อมระบบ fallback
 * @param {string} table  ชื่อตารางใน Supabase
 * @param {any} fallback  ข้อมูลจำลองที่ใช้แทนเมื่อดึงไม่สำเร็จ
 * @param {object} opts   ตัวเลือกเพิ่มเติม เช่น single (ดึงแถวเดียว), order (จัดเรียง)
 */
export async function fetchWithFallback(table, fallback, opts = {}) {
  // ถ้ายังไม่ตั้งค่า Supabase ให้คืน mock data ทันที
  if (!isSupabaseReady) return { data: fallback, isMock: true };

  try {
    // สร้าง query พื้นฐาน select ทุกคอลัมน์
    let query = supabase.from(table).select('*');

    // ถ้ามีการระบุคอลัมน์สำหรับเรียงลำดับ ให้เพิ่มเงื่อนไข order
    if (opts.order) query = query.order(opts.order, { ascending: opts.ascending ?? true });

    // ถ้าต้องการแถวเดียว (เช่น สถิติสรุป) ให้ limit 1 แล้วใช้ maybeSingle
    if (opts.single) query = query.limit(1);

    const { data, error } = await query;

    // ถ้ามี error หรือไม่มีข้อมูลเลย ให้ใช้ mock แทนเพื่อไม่ให้หน้าเว็บพัง
    if (error || !data || data.length === 0) {
      console.warn(`[Supabase] ดึงข้อมูลตาราง "${table}" ไม่สำเร็จ → ใช้ข้อมูลจำลองแทน`, error);
      return { data: fallback, isMock: true };
    }

    // คืนค่าแถวแรกถ้าเป็นโหมด single ไม่งั้นคืนทั้ง array
    return { data: opts.single ? data[0] : data, isMock: false };
  } catch (err) {
    // ดักจับ network error ทุกกรณี แล้ว fallback
    console.error(`[Supabase] เกิดข้อผิดพลาดขณะเชื่อมต่อ:`, err);
    return { data: fallback, isMock: true };
  }
}