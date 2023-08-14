// https://vitejs.dev/config/
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    //  envPrefix: 'EXPO_PUBLIC_',
    //  envDir: resolve(__dirname, '..', '..', 'packages', 'front'),
    plugins: [react(), svgr({ exportAsDefault: true })],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-web-svg',
      },
    },
  })
}
