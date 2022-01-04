import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
    }
  }
})
