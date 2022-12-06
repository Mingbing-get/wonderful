const fs = require('fs')

run()

async function run() {
  const directories = fs.readdirSync('packages').filter(f => {
    return fs.statSync(`packages/${f}`).isDirectory()
  })

  const executing = []
  directories.forEach(directoryName => {
    executing.push(build(directoryName))
  })

  return Promise.all(executing)
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
