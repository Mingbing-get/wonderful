const path = require('path')
const fs = require('fs')

const originPath = path.resolve(__dirname, '../packages/rabbit/src/icon/pathMap.js')
const targetPath = path.resolve(__dirname, '../packages/rabbit/preview/assets/sprite.svg')
const keyListFile = path.resolve(__dirname, '../packages/rabbit/src/icon/iconKeyList.ts')

const pathMap = require(originPath)

const symbolList = []
const keyList = {}
for (const key in pathMap) {
  symbolList.push(singleTemplate(key, pathMap[key]))
  keyList[key] = true
}

const fileContent = (
  `<svg>
  ${
  symbolList.join('\n')
  }
</svg>`
)

const keyListContent = (
  `const keyList = ${JSON.stringify(keyList, undefined, 2)}
export default keyList
`
)

fs.writeFileSync(targetPath, fileContent)
console.log(`generate sprite file, save to ${targetPath}`)
fs.writeFileSync(keyListFile, keyListContent)
console.log(`generate icon key list file, save to ${keyListFile}`)
console.log()

function singleTemplate(id, content) {
  return (
`  <symbol id='${id}' width='1024' height='1024' xmlns="http://www.w3.org/2000/svg">
     ${content}
  </symbol>`
  )
}
