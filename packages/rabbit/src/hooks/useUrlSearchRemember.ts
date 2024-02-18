import { useEffect, useMemo } from 'react'

interface Options<T extends string> {
  searchKey?: string
  searchValue?: T
}

export default function useUrlSearchRemember<T extends string>({ searchKey, searchValue }: Options<T>) {
  const defaultSearchValue = useMemo(() => {
    if (!searchKey) return

    const urlObj = new URL(location.href)
    return urlObj.searchParams.get(searchKey) as T
  }, [])

  useEffect(() => {
    if (!searchKey) return

    const urlObj = new window.URL(window.location.href)
    if (!searchValue) {
      urlObj.searchParams.delete(searchKey)
    } else {
      urlObj.searchParams.set(searchKey, searchValue)
    }
    history.pushState({}, '', urlObj.href)
  }, [searchKey, searchValue])

  return defaultSearchValue
}
