import React, { useCallback, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import Trigger from '../../selectTrigger'
import Panel from '../../selectPanel'
import Icon from '../../icon'
import Popover from '../../popover'

import { SelectOptionType, SelectProps, SelectValueType } from '../../types/select'
import './index.scss'

export default function Select<T extends SelectValueType>({
  defaultValue,
  value,
  options,
  className,
  style,
  placeholder,
  disabled,
  allowClear,
  wrapperClassName,
  wrapperStyle,
  onChange,
  ...extra
}: SelectProps<T>) {
  const [visible, setVisible] = useState(false)
  const [_value, setValue] = useState<T>()
  const initRef = useRef(false)

  useEffect(() => setValue(defaultValue), [])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      if (value === undefined) return
    }

    setValue((old) => {
      if (value === old) return old

      return value
    })
  }, [value])

  const handleClick = useCallback(
    ({ value, onClick }: SelectOptionType<T>) => {
      if (value === _value) return

      onChange?.(value)
      setValue(value)
      setVisible(false)
      onClick?.(value)
    },
    [_value, onChange]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()

      onChange?.(undefined)
      setValue(undefined)
    },
    [onChange]
  )

  const findLabelByValue = useCallback(
    (value?: T) => {
      if (value === undefined) return
      const currentOption = options.find((item) => item.value === value)
      return currentOption?.label || currentOption?.value
    },
    [options]
  )

  if (disabled) {
    return (
      <Trigger
        {...extra}
        placeholder={placeholder}
        className={classNames('rabbit-select', className)}
        style={style}
        disabled
        suffix={
          <Icon
            type="arrowDownFill"
            className={classNames('icon-arrow-down-fill', visible && 'rotate-180')}
          />
        }>
        {findLabelByValue(_value)}
      </Trigger>
    )
  }

  return (
    <Popover
      widthFollowTarget
      arrow="none"
      className="rabbit-select-popover"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <Panel
          options={options}
          value={_value}
          wrapperClassName={wrapperClassName}
          wrapperStyle={wrapperStyle}
          onClickItem={handleClick}
        />
      }>
      <Trigger
        {...extra}
        placeholder={placeholder}
        className={classNames('rabbit-select', _value && allowClear && 'has-value', visible && 'is-focused', className)}
        style={style}
        suffix={
          <>
            {allowClear && (
              <Icon
                className="icon-close"
                type="close"
                onClickCapture={handleClear}
              />
            )}
            <Icon
              type="arrowDownFill"
              className={classNames('icon-arrow-down-fill', visible && 'rotate-180')}
            />
          </>
        }>
        {findLabelByValue(_value)}
      </Trigger>
    </Popover>
  )
}
