const path = require('path')
const ts = require('rollup-plugin-typescript2')
const nodeResolve = require('@rollup/plugin-node-resolve')
const babel =  require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const scss = require('rollup-plugin-scss')
const jsx = require('acorn-jsx')

const { getBabelOutputPlugin } = babel

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const name = path.basename(packageDir)

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: `es`
  },
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  },
  // runtime-only builds, for main "vue" package only
  'esm-bundler-runtime': {
    file: resolve(`dist/${name}.runtime.esm-bundler.js`),
    format: `es`
  },
  'esm-browser-runtime': {
    file: resolve(`dist/${name}.runtime.esm-browser.js`),
    format: 'es'
  },
  'global-runtime': {
    file: resolve(`dist/${name}.runtime.global.js`),
    format: 'iife'
  }
}

const packageFormats = ['esm']

function createConfig(format, output) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.sourcemap = true
  output.plugins = [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
  output.format = format

  return {
    input: resolve('src/index.ts'),
    output,
    acornInjectPlugins: [jsx()],
    plugins: [
      nodeResolve(),
      scss(),
      ts({
        check: process.env.NODE_ENV === 'production',
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        // cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: output.sourcemap,
          },
        },
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
      })
    ]
  }
}

module.exports = packageFormats.map(format => createConfig(format, outputConfigs[format]))
