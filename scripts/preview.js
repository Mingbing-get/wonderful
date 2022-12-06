const { serve } = require('esbuild')
const { resolve, relative } = require('path')
const sassLoader = require('esbuild-plugin-sass')

const args = require('minimist')(process.argv.slice(2))

const target = args._[0] || 'marrow'

const outfile = resolve(__dirname, `../packages/${target}/preview/dist/${target}.js`)
const relativeOutfile = relative(process.cwd(), outfile)

serve({
  port: 3000,
  servedir: resolve(__dirname, `../packages/${target}/preview`)
}, {
  entryPoints: [resolve(__dirname, `../packages/${target}/preview/index.tsx`)],
  outdir: resolve(__dirname, `../packages/${target}/preview/dist`),
  bundle: true,
  splitting: true,
  sourcemap: true,
  assetNames: 'assets/[name]',
  treeShaking: true,
  format: 'esm',
  target: ['ESNext'],
  color: true,
  write: false,

  loader: {
    '.jpeg': 'file',
    '.jpg': 'file',
    '.mp3': 'file',
    '.jsx': 'jsx',
  },

  plugins: [sassLoader()]
}).then(() => {
  console.log(`watching: ${relativeOutfile}`)
})

// let external = []
// if (!inlineDeps) {
//   // cjs & esm-bundler: external all deps
//   if (format === 'cjs' || format.includes('esm-bundler')) {
//     external = [
//       ...external,
//       ...Object.keys(pkg.dependencies || {}),
//       ...Object.keys(pkg.peerDependencies || {}),
//       // for @vue/compiler-sfc / server-renderer
//       'path',
//       'url',
//       'stream'
//     ]
//   }

  // build({
  //   entryPoints: [resolve(__dirname, `../packages/${target}/preview/index.tsx`)],
  //   outfile,
  //   bundle: true,
  //   external,
  //   sourcemap: true,
  //   format: outputFormat,
  //   plugins:
  //     format === 'cjs' || pkg.buildOptions?.enableNonBrowserBranches
  //       ? [nodePolyfills.default()]
  //       : undefined,
  //   define: {
  //     __COMMIT__: `"dev"`,
  //     __VERSION__: `"${pkg.version}"`,
  //     __DEV__: `true`,
  //     __TEST__: `false`,
  //     __BROWSER__: String(
  //       format !== 'cjs' && !pkg.buildOptions?.enableNonBrowserBranches
  //     ),
  //     __GLOBAL__: String(format === 'global'),
  //     __ESM_BUNDLER__: String(format.includes('esm-bundler')),
  //     __ESM_BROWSER__: String(format.includes('esm-browser')),
  //     __NODE_JS__: String(format === 'cjs'),
  //     __SSR__: String(format === 'cjs' || format.includes('esm-bundler')),
  //     __FEATURE_SUSPENSE__: `true`,
  //     __FEATURE_OPTIONS_API__: `true`,
  //     __FEATURE_PROD_DEVTOOLS__: `false`
  //   },
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  //   loader: {
  //     '.html': 'text',
  //     '.js': 'jsx',
  //     '.jsx': 'jsx',
  //     '.scss': 'css',
  //     '.sass': 'css',
  //     '.less': 'css',
  //     '.css': 'css',
  //     '.png': 'dataurl',
  //     '.jpg': 'dataurl',
  //     '.jpeg': 'dataurl',
  //   },
  //   watch: {
  //     onRebuild(error) {
  //       if (!error) console.log(`rebuilt: ${relativeOutfile}`)
  //     }
  //   }
  // }).then(() => {
  //   console.log(`watching: ${relativeOutfile}`)
  // })
// }
