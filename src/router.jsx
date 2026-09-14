// src/router.jsx
// กำหนด route ทั้งหมดของแอปด้วย createBrowserRouter
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';
import ModulesPage from './pages/ModulesPage';
import SponsorPage from './pages/SponsorPage';
import TeamPage from './pages/TeamPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    // Layout หลักที่ครอบทุกหน้า (มี Navbar + Footer)
    path: '/',
    element: <MainLayout />,
    // หน้า 404 — แสดงเมื่อไม่ตรง route ใดเลย
    errorElement: <NotFoundPage />,
    children: [
      { index: true,          element: <HomePage /> },
      { path: 'materials',    element: <MaterialsPage /> },
      { path: 'modules',      element: <ModulesPage /> },
      {
        // SponsorPage จัดการ Footer ของตัวเองเพราะมี full-bleed background
        path: 'sponsor',
        element: <SponsorPage />,
      },
      { path: 'team',         element: <TeamPage /> },
      // Catch-all 404
      { path: '*',            element: <NotFoundPage /> },
    ],
  },
]);

export default router;
