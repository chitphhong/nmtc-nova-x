import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // redirect ทุก 404 กลับ index.html เพื่อให้ React Router จัดการ routing เอง
    historyApiFallback: true,
  },
})
