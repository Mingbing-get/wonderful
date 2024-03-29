import React, { useMemo } from 'react'
import classNames from 'classnames'

import Icon from '../icon'
import { ProgressProps, ProgressStatus, ProgressBaseProps, ProgressCircleProps, ProgressLinearGradientColor } from '../types/progress'
import './index.scss'

function defaultFormat(percent: number, status: ProgressStatus) {
  if (status === 'normal') return `${percent}%`
  if (status === 'error') return <Icon type="close" />
  return <Icon type="right" />
}

export default function Progress({
  type = 'line',
  percent,
  hiddenInfo = false,
  status = 'normal',
  strokeWidth = 6,
  strokeColor = 'var(--rabbit-primary-color)',
  successColor = 'var(--rabbit-success-color)',
  errorColor = 'var(--rabbit-error-color)',
  trailColor = 'rgba(0,0,0,.06)',
  format = defaultFormat,
  ...extra
}: ProgressProps) {
  const _percent = useMemo(() => {
    if (percent < 0) return 0
    if (percent > 100) return 100
    return percent
  }, [percent])

  const _status = useMemo(() => {
    if (status === 'normal') {
      if (_percent === 100) return 'success'
    }
    return status
  }, [_percent, status])

  const { childExtra, extraProps } = useMemo(() => {
    const { width, gapDegree, startPosition, ...extraProps } = extra as any

    return { childExtra: { width, gapDegree, startPosition }, extraProps }
  }, [extra])

  const ChartRender = useMemo(() => {
    return {
      line: ProgressLine,
      circle: ProgressCircle,
    }[type]
  }, [type])

  return (
    <div
      {...extraProps}
      className={classNames('rabbit-progress-wrapper', 'rabbit-component', `type-${type}`)}
      style={{
        width: childExtra.width || 'auto',
      }}>
      <ChartRender
        percent={_percent}
        status={_status}
        hiddenInfo={hiddenInfo}
        format={format}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        trailColor={trailColor}
        successColor={successColor}
        errorColor={errorColor}
        {...childExtra}
      />
    </div>
  )
}

function ProgressLine({ percent, status, strokeColor, successColor, errorColor, strokeWidth, trailColor, hiddenInfo, format }: Required<ProgressBaseProps>) {
  const lineColor = useMemo(() => {
    let currentColor = strokeColor
    if (status === 'success') currentColor = successColor
    if (status === 'error') currentColor = errorColor

    if (colorIsString(currentColor)) return currentColor

    const res: string[] = []
    for (const key in currentColor) {
      res.push(`${currentColor[key]} ${key}%`)
    }
    return `linear-gradient(to right, ${res.join(',')})`
  }, [strokeColor, status, successColor, errorColor])

  return (
    <>
      <div
        className="progress-line"
        style={{ height: strokeWidth, backgroundColor: trailColor }}>
        <div
          className="progress-line-complete"
          style={{ background: lineColor, width: `${percent}%` }}
        />
      </div>
      {!hiddenInfo && (
        <span
          className="progress-info"
          style={{ color: lineColor }}>
          {format(percent, status)}
        </span>
      )}
    </>
  )
}

export function ProgressCircle({
  percent,
  status,
  strokeColor,
  successColor,
  errorColor,
  strokeWidth,
  trailColor,
  hiddenInfo,
  gapDegree = 0,
  startPosition = 'top',
  format,
}: Required<ProgressBaseProps> & Omit<ProgressCircleProps, 'type' | 'width'>) {
  const r = 50
  const lineColor = useMemo(() => {
    let currentColor = strokeColor
    if (status === 'success') currentColor = successColor
    if (status === 'error') currentColor = errorColor

    return currentColor
  }, [strokeColor, status, successColor, errorColor])

  const linearGradientId = useMemo(() => {
    return `progress-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`
  }, [])

  const perimeter = useMemo(() => {
    return Math.PI * 2 * (r - strokeWidth / 2)
  }, [strokeWidth])

  const gap = useMemo(() => {
    return (Math.PI * 2 * (r - strokeWidth / 2) * gapDegree) / 360
  }, [gapDegree, strokeWidth])

  const baseRotate = useMemo(() => {
    return {
      top: -90,
      right: 0,
      bottom: 90,
      left: 180,
    }[startPosition]
  }, [startPosition])

  return (
    <>
      <svg
        className="progress-circle"
        viewBox={`${-r} ${-r} ${2 * r} ${2 * r}`}
        style={{ transform: `rotate(${baseRotate + gapDegree / 2}deg)` }}>
        {!colorIsString(lineColor) && (
          <defs>
            <linearGradient
              id={linearGradientId}
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%">
              {Object.keys(lineColor).map((key) => (
                <stop
                  key={key}
                  offset={`${key}%`}
                  stopColor={lineColor[key as any as number]}
                />
              ))}
            </linearGradient>
          </defs>
        )}
        <circle
          strokeWidth={strokeWidth}
          r={r - strokeWidth / 2}
          cx={0}
          cy={0}
          strokeLinecap="round"
          stroke={trailColor}
          fillOpacity={0}
          strokeDasharray={`${perimeter - gap} ${gap}`}
          strokeDashoffset={0}
        />
        <circle
          strokeWidth={strokeWidth}
          r={r - strokeWidth / 2}
          cx={0}
          cy={0}
          strokeLinecap="round"
          stroke={colorIsString(lineColor) ? lineColor : `url(#${linearGradientId})`}
          fillOpacity={0}
          strokeDasharray={`${((perimeter - gap) * percent) / 100} ${perimeter}`}
          strokeDashoffset={0}
        />
      </svg>
      {!hiddenInfo && (
        <span
          className="progress-info"
          style={{ color: colorIsString(lineColor) ? lineColor : '' }}>
          {format(percent, status)}
        </span>
      )}
    </>
  )
}

function colorIsString(color: string | ProgressLinearGradientColor): color is string {
  return typeof color === 'string'
}
