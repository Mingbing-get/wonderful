import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import Tag from '../../tag'
import Popover from '../../popover'
import Icon from '../../icon'
import { MultipleSelectProps, SelectOptionType, SelectValueType, SelectGroup } from '../../types/select'
import useMultipleDisplay from '../../hooks/useMultipleDisplay'
import Panel from './selectPanel'
import { isSelectGroup } from '../../selectPanel/utils'

import './index.scss'

function defaultDisplayRender<T extends SelectValueType>(checkedPath: SelectOptionType<T>[], onClose?: (data: SelectOptionType<T>) => void) {
  return checkedPath.map((option, index) => {
    return (
      <Tag
        className="multiple-display-tag"
        closable={!!onClose}
        key={option.value}
        onClose={(e) => {
          onClose?.(option)
          e.stopPropagation()
        }}>
        {option.label || option.value}
      </Tag>
    )
  })
}

export default function MultipleSelect<T extends SelectValueType, O extends SelectOptionType<T>>({
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
}: MultipleSelectProps<T, O>) {
  const [_value, setValue] = useState(defaultValue || value || [])
  const [triggerChange, setTriggerChange] = useState(false)
  const [visiblePopover, setVisiblePopover] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)

  useEffect(() => {
    if (!triggerChange) return

    setTriggerChange(false)
    onChange?.(_value)
  }, [onChange, triggerChange, _value])

  const checkedOptions = useMemo(() => {
    const checkedOptions: O[] = []

    options.forEach((option) => {
      if (isSelectGroup(option)) {
        option.options.forEach((subOption) => {
          if (_value.includes(subOption.value)) {
            checkedOptions.push(subOption)
          }
        })
      } else {
        if (_value.includes(option.value)) {
          checkedOptions.push(option)
        }
      }
    })

    return checkedOptions
  }, [_value, options])

  const handleChangeValue = useCallback(
    (key: T, checked?: boolean) => {
      if (disabled) return

      setValue((old) => {
        if (checked) {
          if (old.includes(key)) return old

          const newValue = [...old, key]
          setTriggerChange(true)
          return newValue
        }

        const newValue = old.filter((item) => item !== key)
        setTriggerChange(true)
        return newValue
      })
    },
    [disabled]
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

    const afterFilterOptions: O[] | SelectGroup<T, O>[] = []

    options.forEach((item) => {
      if (typeof item.label !== 'string') {
        afterFilterOptions.push(item as any)
        return
      }

      if (isSelectGroup(item)) {
        const newGroup: SelectGroup<T, O> = { ...item, options: [] }

        item.options.forEach((subOption) => {
          if (typeof subOption.label !== 'string' || subOption.label.includes(searchText)) {
            newGroup.options.push(subOption)
          }
        })

        if (newGroup.options.length > 0) {
          afterFilterOptions.push(newGroup as any)
        }
      } else if (item.label.includes(searchText)) {
        afterFilterOptions.push(item as any)
      }
    })

    return afterFilterOptions
  }, [options, searchText])

  return (
    <div
      className={classNames('rabbit-multiple-select-wrapper rabbit-component', disabled && 'is-disabled', visiblePopover && 'is-focus', className)}
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
        <span className="select-arrow">
          {
            <Icon
              className={classNames('icon-arrow-down-fill', visiblePopover && !showSearchInput && 'rotate-180')}
              type={showSearchInput ? 'search' : 'arrowDownFill'}
            />
          }
        </span>
      </span>
    </div>
  )
}
