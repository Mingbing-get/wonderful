import React, { useCallback, useEffect, useState, forwardRef, ForwardedRef } from 'react'
import classNames from 'classnames'

import Input from '../../input'
import Icon from '../../icon'
import { InputRef } from '../../types/input'

import './index.scss'

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string
  style?: React.CSSProperties
  showSearchInput?: boolean
  showPlaceholder?: boolean
  placeholder?: string
  displayValue?: React.ReactNode
  clearIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  searchText?: string
  inputRef?: React.RefObject<InputRef>
  allowClear?: boolean
  disabled?: boolean
  onChangeSearch?: (searchText: string) => void
  onClear?: () => void
}

function WithSearchTrigger(
  {
    className,
    style,
    showSearchInput,
    showPlaceholder,
    placeholder,
    displayValue,
    searchText,
    clearIcon,
    suffixIcon,
    inputRef,
    allowClear,
    disabled,
    onChangeSearch,
    onClear,
    ...extra
  }: Props,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const [_searchText, setSearchText] = useState(searchText)

  useEffect(() => {
    setSearchText(searchText)
  }, [searchText])

  const handleChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value)
      onChangeSearch?.(e.target.value)
    },
    [onChangeSearch]
  )

  return (
    <div
      {...extra}
      ref={ref}
      style={style}
      className={classNames('rabbit-with-search-trigger-wrapper rabbit-component', className, allowClear && 'allow-clear', disabled && 'is-disabled')}>
      <div className={classNames('with-search-trigger', showSearchInput && 'show-input')}>
        <div className={classNames('with-search-value', showPlaceholder && 'show-placeholder')}>{showPlaceholder ? placeholder : displayValue}</div>
        <Input
          ref={inputRef}
          value={_searchText}
          onChange={handleChangeSearchText}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <span className="with-search-icon">
        <span className="with-search-arrow">
          {suffixIcon || (
            <Icon
              className={classNames('icon-arrow-down-fill')}
              type={showSearchInput ? 'search' : 'arrowDownFill'}
            />
          )}
        </span>
        <span
          className="with-search-clear"
          onClick={(e) => {
            onClear?.()
            e.stopPropagation()
          }}>
          {clearIcon || (
            <Icon
              className="with-search-close"
              type="close"
            />
          )}
        </span>
      </span>
    </div>
  )
}

export default forwardRef(WithSearchTrigger)
