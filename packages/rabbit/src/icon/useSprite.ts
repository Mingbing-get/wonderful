import { useEffect, useCallback, useState } from 'react'
import spritePath from '../../preview/assets/sprite.svg'

let spritePromise: Promise<HTMLDivElement>

export default function useSprite(id: string) {
  const [svgPath, setSvgPath] = useState<string>()

  const init = useCallback(async (id: string) => {
    if (!spritePromise) {
      spritePromise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(spritePath)
          const data = await response.text()
          const div = document.createElement('div')
          div.innerHTML = data

          resolve(div)
        } catch (error) {
          reject(error)
        }
      })
    }

    const data = await spritePromise
    setSvgPath(data.querySelector(`#${id}`)?.innerHTML)
  }, [])

  useEffect(() => {
    init(id)
  }, [id])

  return svgPath
}
