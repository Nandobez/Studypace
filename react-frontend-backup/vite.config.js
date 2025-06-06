import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        host: true,
        port: 5173,
        proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
        }
        }
    }
});
