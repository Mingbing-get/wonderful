import React from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import Popover from '../popover'
import { ProgressCircle } from '../progress'
import { StepsItemType, StepsType } from './index'

type Props = {
  index: number,
  type: StepsType,
  percent?: number,
  onClick?: () => void,
} & StepsItemType

export default function Item({
  index,
  type,
  percent,
  onClick,
  description,
  title,
  subTitle,
  disabled,
  icon,
  status,
}: Props) {
  if (type === 'inline') {
    return (
      <div className={classNames('rabbit-steps-item type-inline', `status-${status}`)}>
        <Popover
          trigger='hover'
          placement='top'
          content={
            <div className={classNames('rabbit-steps-item', `status-${status}`)}>
              <div className='steps-tip'>
                <div className='tip-header'>
                  <div className='tip-title'>{title}</div>
                  <div className='tip-subtitle'>{subTitle}</div>
                </div>
                <div className='tip-description'>{description}</div>
              </div>
            </div>
          }
        >
          <div className='steps-dot'>
            <span className='default-dot'></span>
            <div className='tip-title'>{title}</div>
          </div>
        </Popover>
      </div>
    )
  }

  return (
    <div
      className={classNames('rabbit-steps-item', `type-${type}`, `status-${status}`)}
      onClick={() => !disabled && onClick?.()}
    >
      <div className='steps-dot'>
        {icon || (
          <span className='default-dot'>
            {status === 'finish' && <Icon type='right' />}
            {status === 'error' && <Icon type='close' />}
            {(!status || !['finish', 'error'].includes(status)) && index}
          </span>
        )}
        {
          percent !== undefined && (
            <ProgressCircle
              percent={percent}
              hiddenInfo
              status={status === 'error' ? 'error' : 'normal'}
              strokeColor='var(--rabbit-primary-color)'
              successColor='var(--rabbit-primary-color)'
              errorColor='var(--rabbit-error-color)'
              strokeWidth={4}
              trailColor='#fff'
              format={() => ''}
            />
          )
        }
      </div>
      <div className='steps-tip'>
        <div className='tip-header'>
          <div className='tip-title'>{title}</div>
          <div className='tip-subtitle'>{subTitle}</div>
        </div>
        <div className='tip-description'>{description}</div>
      </div>
    </div>
  )
}
