import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsAliasesSupportPlugin from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-cert.pem'))
        },
        port: 3000 // Вы можете указать любой порт
    },
    plugins: [react(), tsAliasesSupportPlugin()]
});
