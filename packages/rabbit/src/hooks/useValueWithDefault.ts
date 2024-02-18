import { useState, useRef, useEffect } from 'react'

interface Init<T> {
  value?: T
  isChange: boolean
}

export default function useValueWithDefault<T>(value?: T, defaultValue?: T): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [_value, setValue] = useState(value || defaultValue)
  const initRef = useRef<Init<T>>({ value, isChange: false })

  useEffect(() => {
    if (!initRef.current.isChange && value === initRef.current.value) return

    initRef.current.isChange = true
    setValue(value)
  }, [value])

  return [_value, setValue]
}
