const fs = require('fs')
const path = require('path')

const pkg = require(path.resolve(`package.json`))

run()

async function run() {
  const directories = fs.readdirSync('packages').filter((f) => {
    return fs.statSync(`packages/${f}`).isDirectory()
  })

  const executing = []
  directories.forEach((directoryName) => {
    if (directoryName === 'types') return
    executing.push(build(directoryName))
  })
  await Promise.all(executing)
  await copyTypes()

  const addJson = []
  directories.forEach((directoryName) => {
    addJson.push(addPackageJson(directoryName))
  })
  addJson.push(addMainPackageJson())
  await Promise.all(addJson)

  await addReadMe()
}

async function build(target) {
  const { execa } = await import('execa')
  await execa('npm', ['run', `build:${target}`], { stdio: 'inherit' })
}

async function copyTypes() {
  const dir = path.resolve(__dirname, '../dist/types/types')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const sourceDir = path.resolve(__dirname, '../packages/types')

  fs.readdirSync(sourceDir).filter((f) => {
    const filePath = path.resolve(sourceDir, f)
    if (fs.statSync(filePath).isFile() && f !== 'package.json') {
      fs.copyFileSync(filePath, path.resolve(dir, f))
    }
  })
}

async function addPackageJson(name) {
  const dir = path.resolve(__dirname, `../dist/${name}`)
  const fileName = path.resolve(dir, 'package.json')

  const data = {
    name: name,
    version: pkg.version,
    main: 'index.js',
    module: 'index.js',
    types: `../types/${name}/src/index.d.ts`,
    keywords: [],
    author: '',
    license: 'ISC',
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function addMainPackageJson() {
  const dir = path.resolve(__dirname, '../dist')
  const fileName = path.resolve(dir, 'package.json')

  const data = {
    name: pkg.name,
    version: pkg.version,
    keywords: pkg.keywords,
    description: pkg.description,
    author: pkg.author,
    license: pkg.license,
    devDependencies: pkg.devDependencies,
    dependencies: pkg.dependencies,
    peerDependencies: pkg.peerDependencies,
    repository: pkg.repository,
    homepage: pkg.homepage,
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function addReadMe() {
  const dir = path.resolve(__dirname, '../dist')
  const fileName = path.resolve(dir, 'README.md')

  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve('README.md'), (err, data) => {
      if (err) {
        reject(err)
        return
      }
      fs.writeFile(fileName, data, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}
