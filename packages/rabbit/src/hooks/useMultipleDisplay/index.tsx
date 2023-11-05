import React, { useState, useRef, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { InputRef } from '../../types/input'

import compatible from '../../compatible'
import Input from '../../input'

import './index.scss'

type Props = {
  hasValue?: boolean
  showSearchInput?: boolean
  children?: React.ReactNode
}

export default function useMultipleDisplay({ hasValue, showSearchInput, children }: Props) {
  const [wrapperHeight, setWrapperHeight] = useState<string | number>('auto')
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<InputRef>(null)
  const valueWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasValue) {
      setWrapperHeight('auto')
      return
    }
    setTimeout(() => {
      if (!valueWrapperRef.current) {
        setWrapperHeight('auto')
        return
      }
      compatible.getBoundingClientRect(valueWrapperRef.current).then((rectDom) => {
        setWrapperHeight(rectDom.height || 'auto')
      })
    })
  }, [children, hasValue])

  const component = useMemo(() => {
    return (
      <div
        className={classNames('multiple-display-trigger', showSearchInput && 'show-input')}
        style={{ height: wrapperHeight }}>
        <Input
          ref={inputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <div
          ref={valueWrapperRef}
          className={classNames('multiple-display-value', !hasValue && 'show-placeholder')}
          style={{ height: !hasValue ? '100%' : 'auto' }}>
          {children}
        </div>
      </div>
    )
  }, [showSearchInput, wrapperHeight, hasValue, children, searchText])

  return {
    component,
    inputRef,
    searchText,
    setSearchText,
  }
}
