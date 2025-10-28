// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ GitHub Pages용 경로 설정
export default defineConfig({
  plugins: [react()],
  base: '/oojinwoo-front/', // GitHub repo 이름과 동일해야 함
})
