import React, { useMemo } from 'react'
import classNames from 'classnames'

import { Select } from '../select'
import InputNumber from '../inputNumber'
import Icon from '../icon'

import { PaginationProps } from '../types/pagination'
import { SelectOptionType } from '../types/select'

type RequireKeys = 'current' | 'itemRender' | 'pageSize' | 'showItemCount'
type OmitKeys = 'simple' | 'onChange' | 'onPageSizeChange' | 'hideOnSinglePage' | 'defaultPageSize' | 'defaultCurrent'

type RequirePick<T, K extends keyof T> = Pick<Required<T>, K>

interface Props extends Omit<PaginationProps, OmitKeys | RequireKeys>, RequirePick<PaginationProps, RequireKeys> {
  jumperPage?: number
  onJumperPage?: (page?: number) => void
  onChangePage?: (page: number) => void
  onChangePageSize?: (pageSize?: number) => void
  onJumperBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onJumperKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function CommonPagination({
  className,
  style,
  total,
  current,
  pageSize,
  pageSizeOptions,
  showItemCount,
  disabled,
  showQuickJumper,
  jumperPage,
  itemRender,
  showTotal,
  onJumperPage,
  onChangePage,
  onChangePageSize,
  onJumperBlur,
  onJumperKeyUp,
  ...extra
}: Props) {
  const _pageSizeOptions: SelectOptionType<number>[] = useMemo(() => {
    if (!pageSizeOptions) return []

    return pageSizeOptions.map((item) => ({
      value: item,
      label: `${item}条/页`,
    }))
  }, [pageSizeOptions])

  const range: [number, number] = useMemo(() => {
    return [current * pageSize, Math.min((current + 1) * pageSize, total)]
  }, [current, pageSize, total])

  const items = useMemo(() => {
    const items: React.ReactNode[] = []
    const maxPage = Math.ceil(total / pageSize) - 1
    const hasFirstPage = current === Math.ceil(showItemCount / 2)
    const hasPreEllipse = current > Math.ceil(showItemCount / 2)
    const hasLastPage = maxPage - current === Math.ceil(showItemCount / 2)
    const hasNextEllipse = maxPage - current > Math.ceil(showItemCount / 2)

    if (hasFirstPage || hasPreEllipse) {
      items.push(
        <span
          className="pagination-item"
          key={0}
          onClick={() => onChangePage?.(0)}>
          {itemRender(0, 'page', <span className="pagination-page-btn">1</span>)}
        </span>
      )
    }
    if (hasPreEllipse) {
      items.push(
        <span
          className="pagination-ellipsis-btn"
          key="ellipsis-prev">
          {itemRender(-1, 'ellipsis', <Icon type="ellipsis" />)}
        </span>
      )
    }

    const start = Math.max(current - Math.floor((showItemCount - 1) / 2), 0)
    const end = Math.min(current + Math.floor((showItemCount - 1) / 2), maxPage)
    for (let i = start; i <= end; i++) {
      items.push(
        <span
          className="pagination-item"
          key={i}
          onClick={() => onChangePage?.(i)}>
          {itemRender(i, 'page', <span className={classNames('pagination-page-btn', i === current && 'is-active')}>{i + 1}</span>)}
        </span>
      )
    }

    if (hasNextEllipse) {
      items.push(
        <span
          className="pagination-ellipsis-btn"
          key="ellipsis-next">
          {itemRender(-1, 'ellipsis', <Icon type="ellipsis" />)}
        </span>
      )
    }
    if (hasLastPage || hasNextEllipse) {
      items.push(
        <span
          className="pagination-item"
          key={maxPage}
          onClick={() => onChangePage?.(maxPage)}>
          {itemRender(maxPage, 'page', <span className="pagination-page-btn">{maxPage + 1}</span>)}
        </span>
      )
    }

    return items
  }, [current, pageSize, total, showItemCount, itemRender, onChangePage])

  return (
    <div
      {...extra}
      className={classNames('rabbit-pagination-wrapper', 'rabbit-component', disabled && 'is-disabled', className)}
      style={style}>
      {showTotal && <div className="pagination-total">{showTotal(total, range)}</div>}
      <div onClick={() => onChangePage?.(current - 1)}>
        {itemRender(
          -1,
          'prev',
          <div className="pagination-prev-btn">
            <Icon type="arrowLeft" />
          </div>
        )}
      </div>
      {items}
      <div onClick={() => onChangePage?.(current + 1)}>
        {itemRender(
          -1,
          'next',
          <div className="pagination-next-btn">
            <Icon type="arrowRight" />
          </div>
        )}
      </div>
      {_pageSizeOptions.length > 0 && (
        <Select
          style={{ width: '5rem', minWidth: '5rem' }}
          value={pageSize}
          options={_pageSizeOptions}
          onChange={onChangePageSize}
          disabled={disabled}
        />
      )}
      {showQuickJumper && (
        <div className="pagination-quick-jumper">
          跳至
          <InputNumber
            style={{ width: '3rem', minWidth: '3rem' }}
            showStepBtn={false}
            disabled={disabled}
            value={jumperPage}
            onChange={onJumperPage}
            onBlur={onJumperBlur}
            onKeyUp={onJumperKeyUp}
          />
          页
        </div>
      )}
    </div>
  )
}
