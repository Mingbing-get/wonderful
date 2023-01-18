const fs = require('fs')
const path = require('path')

const pkg = require(path.resolve(`package.json`))

run()

async function run() {
  const directories = fs.readdirSync('packages').filter(f => {
    return fs.statSync(`packages/${f}`).isDirectory()
  })

  const executing = []
  directories.forEach(directoryName => {
    executing.push(build(directoryName))
  })
  await Promise.all(executing)

  const addJson = []
  directories.forEach(directoryName => {
    addJson.push(addPackageJson(directoryName))
  })
  addJson.push(addMainPackageJson())
  await Promise.all(addJson)

  await addReadMe()
}

async function build(target) {
  const { execa } = await import('execa')
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `TARGET:${target}`,
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
}

async function addPackageJson(name) {
  const dir = path.resolve(__dirname, `../dist/${name}`)
  const fileName = path.resolve(dir, 'package.json')

  const data = {
    name: name,
    version: pkg.version,
    main: "index.js",
    module: "index.js",
    types: `${name}/src/index.d.ts`,
    keywords: [],
    author: "",
    license: "ISC"
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
    homepage: pkg.homepage
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
