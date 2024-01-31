import React from 'react'

interface Props {
  title: React.ReactNode
  children?: React.ReactNode
}

export default function Group({ title, children }: Props) {
  return (
    <div className="rabbit-select-group">
      <span className="rabbit-select-group-title">{title}</span>
      <div className="rabbit-select-group-options">{children}</div>
    </div>
  )
}
