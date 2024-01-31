import React, { useRef, useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'

import compatible from '../compatible'
import { SelectValueType, SelectOptionType } from '../types/select'
import { SelectPanelProps } from '../types/selectPanel'
import Option from './option'
import Group from './group'
import { isSelectGroup, findOptionInGroupsOrOptions, findNextOptionInGroupsOrOptions } from './utils'

import './index.scss'

export default function Panel<T extends SelectValueType, O extends SelectOptionType<T>>({
  wrapperClassName,
  value,
  wrapperStyle,
  options,
  onClickItem,
}: SelectPanelProps<T, O>) {
  const [hoverValue, setHoverValue] = useState(value)
  const [refresh, setRefresh] = useState(0)
  const selectWrapperRef = useRef<HTMLDivElement>(null)
  const hoverValueRef = useRef(hoverValue)

  useEffect(() => {
    hoverValueRef.current = hoverValue
  }, [hoverValue])

  const changeHover = useCallback(
    (step: number) => {
      const nextOption = findNextOptionInGroupsOrOptions(options, step, hoverValueRef.current)
      if (!nextOption) return

      setHoverValue(nextOption.value)
      setRefresh((old) => (old + 1) % 10000)
    },
    [options]
  )

  const handleSelect = useCallback(() => {
    if (!hoverValueRef.current) return

    const item = findOptionInGroupsOrOptions(options, hoverValueRef.current)

    if (!item) return

    onClickItem?.(item)
  }, [options, onClickItem])

  useEffect(() => {
    requestAnimationFrame(async () => {
      if (!selectWrapperRef.current) return
      const selectOption = compatible.getElementsByClassName(selectWrapperRef.current, 'is-hover')[0]
      if (!selectOption) return

      const selectWrapperRect = await compatible.getBoundingClientRect(selectWrapperRef.current)
      const topDiff = (await compatible.getBoundingClientRect(selectOption)).top - selectWrapperRect.top
      selectWrapperRef.current.scrollTop = topDiff - selectWrapperRect.height / 2 + selectWrapperRef.current.scrollTop
    })
  }, [refresh])

  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return

      if (e.key === 'ArrowDown') {
        changeHover(1)
      } else if (e.key === 'ArrowUp') {
        changeHover(-1)
      } else if (e.key === 'Enter') {
        handleSelect()
      }

      e.stopPropagation()
      e.preventDefault()
      return false
    }

    window.addEventListener('keydown', keyDown)

    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [changeHover, handleSelect])

  return (
    <div
      ref={selectWrapperRef}
      className={classNames('rabbit-select-wrapper', 'rabbit-component', wrapperClassName)}
      style={wrapperStyle}>
      {options.map((item) => {
        if (isSelectGroup(item)) {
          return (
            <Group
              title={item.label}
              key={item.id}>
              {item.options.map((subItem) => (
                <Option
                  className={classNames({ 'is-select': value === subItem.value, 'is-hover': hoverValue === subItem.value })}
                  {...subItem}
                  key={subItem.value}
                  onClick={(value) => onClickItem?.(subItem)}
                  onMouseEnter={setHoverValue}
                />
              ))}
            </Group>
          )
        }

        return (
          <Option
            className={classNames({ 'is-select': value === item.value, 'is-hover': hoverValue === item.value })}
            {...item}
            key={item.value}
            onClick={(value) => onClickItem?.(item)}
            onMouseEnter={setHoverValue}
          />
        )
      })}
    </div>
  )
}
