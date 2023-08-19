// https://vitejs.dev/config/
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
]

const externals = ['normalize-css-color']

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    //  envPrefix: 'EXPO_PUBLIC_',
    //  envDir: resolve(__dirname, '..', '..', 'packages', 'front'),
    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: extensions,
      },
      //exclude: externals,
    },
    plugins: [react(), svgr({ exportAsDefault: true })],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-web-svg',
      },
    },
  })
}
