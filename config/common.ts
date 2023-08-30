import { UserConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import path from 'path'

export default function getConfig(name: string, needTs?: boolean): UserConfig {
  const plugins: PluginOption[] = [react()]
  if (needTs) {
    plugins.push(
      dts({
        outDir: path.resolve(__dirname, '../dist/types/'),
      })
    )
  }

  return {
    plugins,
    build: {
      lib: {
        entry: path.resolve(__dirname, `../packages/${name}/src/index.ts`),
        name: 'index',
        fileName: (format) => {
          if (format === 'es') return 'index.js'

          return `index.${format}.js`
        },
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: [
          {
            format: 'es',
          },
          {
            format: 'umd',
            name: 'index',
          },
        ],
      },
      outDir: path.resolve(__dirname, `../dist/${name}/`),
    },
  }
}
