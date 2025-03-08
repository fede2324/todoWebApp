import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq, req) => {
      console.log('Proxying request to:', req.url);
    });
  },  
}));
