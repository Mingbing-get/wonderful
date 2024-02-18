import React from 'react'
import classNames from 'classnames'

import InputNumber from '../inputNumber'
import Icon from '../icon'

import { PaginationProps } from '../types/pagination'

type RequirePick<T, K extends keyof T> = Pick<Required<T>, K>

interface Props
  extends Pick<PaginationProps, 'disabled'>,
    RequirePick<PaginationProps, 'itemRender' | 'current' | 'total' | 'pageSize'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  onJumperPage?: (page?: number) => void
  onChangePage?: (page: number) => void
  onJumperBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onJumperKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function SimplePagination({
  disabled,
  current,
  className,
  style,
  total,
  pageSize,
  itemRender,
  onJumperBlur,
  onChangePage,
  onJumperKeyUp,
  onJumperPage,
  ...extra
}: Props) {
  return (
    <div
      {...extra}
      className={classNames('rabbit-pagination-wrapper', 'rabbit-component', disabled && 'is-disabled', className)}
      style={style}>
      <div onClick={() => onChangePage?.(current - 1)}>
        {itemRender(
          -1,
          'prev',
          <div className="pagination-prev-btn">
            <Icon type="arrowLeft" />
          </div>
        )}
      </div>
      <InputNumber
        className="pagination-simple-input"
        showStepBtn={false}
        disabled={disabled}
        value={current + 1}
        onChange={onJumperPage}
        onBlur={onJumperBlur}
        onKeyUp={onJumperKeyUp}
      />
      <span className="pagination-simple-text">/</span>
      <span className="pagination-simple-text">{Math.ceil(total / pageSize)}</span>
      <div onClick={() => onChangePage?.(current + 1)}>
        {itemRender(
          -1,
          'next',
          <div className="pagination-next-btn">
            <Icon type="arrowRight" />
          </div>
        )}
      </div>
    </div>
  )
}
