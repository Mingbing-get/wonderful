import { useEffect, useRef } from 'react'

interface Options<T extends (...args: any[]) => any> {
  fn?: T
  params: Parameters<T>
}

export default function useChangeCallback<T extends (...args: any[]) => any>({ fn, params }: Options<T>) {
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  useEffect(() => {
    fnRef.current?.(...params)
  }, params)
}
