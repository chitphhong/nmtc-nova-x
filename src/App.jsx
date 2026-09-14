// src/App.jsx
// จุดเริ่มต้นของแอป — ส่งต่อการควบคุมให้ RouterProvider จัดการ routing ทั้งหมด
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function App() {
  return <RouterProvider router={router} />;
}
