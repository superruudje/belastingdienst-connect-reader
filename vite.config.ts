import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'), // adjust if needed
            formats: ['iife'], // IIFE gives a single JS file suitable for <script> tag usage
            name: 'BelastingdienstConnectReader',
            fileName: () => 'belastingdienst-connect-reader.js',
        },
        rollupOptions: {
            // Avoid bundling Vue, since it's included in the custom element automatically
            external: [],
            output: {
                globals: {},
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
    plugins: [vue({
        template: {
            compilerOptions: {
                // treat all tags as custom elements (optional if you define only one)
                isCustomElement: tag => tag === 'belastingdienst-connect-reader',
            },
        },
    })],
    define: {
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // alias @ to src
        },
    },
});