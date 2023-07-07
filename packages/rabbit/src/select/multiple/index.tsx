import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import Tag from '../../tag'
import Popover from '../../popover'
import Icon from '../../icon'
import { MultipleSelectProps, SelectOptionType, SelectValueType } from '../../types/select'
import useMultipleDisplay from '../../hooks/useMultipleDisplay'
import Panel from './selectPanel'

import './index.scss'

function defaultDisplayRender<T extends SelectValueType>(checkedPath: SelectOptionType<T>[], onClose?: (data: SelectOptionType<T>) => void) {
  return checkedPath.map((option, index) => {
    return (
      <Tag
        className="multiple-display-tag"
        closable={!!onClose}
        key={option.value}
        onCloseCapture={(e) => {
          onClose?.(option)
          e.stopPropagation()
        }}>
        {option.label || option.value}
      </Tag>
    )
  })
}

export default function MultipleSelect<T extends SelectValueType>({
  className,
  style,
  wrapperClassName,
  wrapperStyle,
  options,
  placeholder,
  disabled,
  defaultValue,
  value,
  showSearch,
  onChange,
  ...extra
}: MultipleSelectProps<T>) {
  const [_value, setValue] = useState(defaultValue || value || [])
  const [visiblePopover, setVisiblePopover] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)

  const checkedOptions = useMemo(() => {
    return options.filter((option) => _value.includes(option.value))
  }, [_value, options])

  const handleChangeValue = useCallback(
    (key: T, checked?: boolean) => {
      if (disabled) return

      setValue((old) => {
        if (checked) {
          if (old.includes(key)) return old

          const newValue = [...old, key]
          onChange?.(newValue)
          return newValue
        }

        const newValue = old.filter((item) => item !== key)
        onChange?.(newValue)
        return newValue
      })
    },
    [onChange, disabled]
  )

  const _displayRender = useCallback(
    (checkedOptions: SelectOptionType<T>[]) => {
      function onClose(data: SelectOptionType<T>) {
        handleChangeValue(data.value, false)
      }

      return defaultDisplayRender(checkedOptions, disabled ? undefined : onClose)
    },
    [handleChangeValue, disabled]
  )

  const handleChangeVisible = useCallback(
    (visible: boolean) => {
      setVisiblePopover(visible)

      if (!showSearch) return
      setShowSearchInput(visible)
      if (visible) {
        inputRef.current?.focus()
      } else {
        setSearchText('')
      }
    },
    [showSearch]
  )

  const { component, inputRef, searchText, setSearchText } = useMultipleDisplay({
    hasValue: _value.length > 0,
    showSearchInput,
    children: _value.length > 0 ? _displayRender(checkedOptions) : placeholder,
  })

  const afterFilterOptions = useMemo(() => {
    if (!searchText) return options

    return options.filter((item) => {
      if (typeof item.label !== 'string') return true

      return item.label.includes(searchText)
    })
  }, [options, searchText])

  return (
    <div
      className={classNames('rabbit-multiple-select-wrapper rabbit-component', disabled && 'is-disabled', className)}
      style={style}
      {...extra}>
      {disabled ? (
        component
      ) : (
        <Popover
          arrow="none"
          className="rabbit-multiple-select-popover"
          onVisibleChange={handleChangeVisible}
          visible={visiblePopover}
          widthFollowTarget
          content={
            <Panel
              value={_value}
              options={afterFilterOptions}
              wrapperClassName={wrapperClassName}
              wrapperStyle={wrapperStyle}
              onClickItem={handleChangeValue}
            />
          }>
          {component}
        </Popover>
      )}
      <span className="select-icon">
        <span className="select-arrow">{<Icon type={showSearchInput ? 'search' : 'arrowDown'} />}</span>
      </span>
    </div>
  )
}
