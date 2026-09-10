// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // นำเข้าไฟล์ CSS หลักที่มี Tailwind directives

// สร้าง root แล้ว render แอปใน StrictMode เพื่อช่วยตรวจจับปัญหาตอน dev
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);