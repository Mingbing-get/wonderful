const path = require('path')
const ts = require('rollup-plugin-typescript2')
const nodeResolve = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const scss = require('rollup-plugin-scss')
const url = require('@rollup/plugin-url')
const jsx = require('acorn-jsx')
const excludeDependenciesFromBundle = require('rollup-plugin-exclude-dependencies-from-bundle')
const clear = require('rollup-plugin-clear')

const { getBabelOutputPlugin } = babel

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const name = path.basename(packageDir)

const outputConfigs = {
  'esm-bundler': {
    file: path.resolve(__dirname, `dist/${name}/index.esm-bundler.js`),
    format: `es`,
  },
  'esm-browser': {
    file: path.resolve(__dirname, `dist/${name}/index.esm-browser.js`),
    format: `es`,
  },
  esm: {
    file: path.resolve(__dirname, `dist/${name}/index.js`),
    format: `es`,
  },
  cjs: {
    file: path.resolve(__dirname, `dist/${name}/index.cjs.js`),
    format: `cjs`,
  },
  global: {
    file: path.resolve(__dirname, `dist/${name}/index.global.js`),
    format: `iife`,
  },
  umd: {
    file: path.resolve(__dirname, `dist/${name}/index.umd.js`),
    format: `umd`,
    name: name,
  },
  // runtime-only builds, for main "vue" package only
  'esm-bundler-runtime': {
    file: path.resolve(__dirname, `dist/${name}/index.runtime.esm-bundler.js`),
    format: `es`,
  },
  'esm-browser-runtime': {
    file: path.resolve(__dirname, `dist/${name}/index.runtime.esm-browser.js`),
    format: 'es',
  },
  'global-runtime': {
    file: path.resolve(__dirname, `dist/${name}/index.runtime.global.js`),
    format: 'iife',
  },
}

const packageFormats = ['esm']

function createConfig(format, output) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.sourcemap = true
  output.plugins = [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      allowAllFormats: true,
    }),
  ]
  output.format = format

  if (process.env.TARGET === 'types') {
    return {
      input: resolve('index.ts'),
      output,
      acornInjectPlugins: [jsx()],
      plugins: [
        nodeResolve(),
        ts({
          check: process.env.NODE_ENV === 'production',
          tsconfig: path.resolve(__dirname, 'tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              sourceMap: output.sourcemap,
              declaration: true,
              // emitDeclarationOnly: true,
            },
          },
        }),
      ],
    }
  }

  return {
    input: resolve('src/index.ts'),
    output,
    acornInjectPlugins: [jsx()],
    external: ['react', 'react-dom'],
    plugins: [
      clear({
        targets: [path.resolve(output.file, '../')],
      }),
      nodeResolve(),
      url({
        fileName: '[dirname][hash][extname]',
        limit: 0,
        publicPath: `node_modules/wonderful-marrow/${process.env.TARGET}/`,
        destDir: path.resolve(output.file, '../'),
      }),
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
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
      }),
      // excludeDependenciesFromBundle(),
    ],
  }
}

module.exports = packageFormats.map((format) => createConfig(format, outputConfigs[format]))
