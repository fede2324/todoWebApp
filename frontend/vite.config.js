import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

//Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => ({ // Only Dev mode
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    } 
  },
  resolve:{
    alias:{
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@imgs': path.resolve(__dirname, 'src/assets/imgs'),
      '@components':path.resolve(__dirname,'src/components')
    }
  },
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq, req) => {
      console.log('Proxying request to:', req.url);
    });
  },  
}));
