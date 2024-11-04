import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    base: 'https://client-bcbhshow.artlu.xyz',
    envPrefix: 'REACT_APP_',
    build: {
      outDir: 'build',
      rollupOptions: {
        plugins: [inject({ Buffer: ['buffer/', 'Buffer'] })],
      },
    },
    plugins: [
      nodePolyfills(),
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({ svgrOptions: { icon: true } }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png'],
        manifest: {
          name: 'BCBHShow Lite Client 🌟',
          short_name: 'BCBHShow Lite Client 🌟',
          description: 'farcaster lite client for the /bcbhshow channel',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/favicon.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@app',
          replacement: path.resolve(__dirname, './src'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@root-entry-name: default;',
        },
      },
    },
    define: {
      // By default, Vite doesn't include shims for NodeJS/
      // necessary for segment analytics lib to work
      global: {},
    },
  };
});
