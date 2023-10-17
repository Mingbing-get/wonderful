import React from 'react'
import { Icon, iconPathKeys } from '../../../rabbit/src'

export default function ExampleIcon() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 23%)', justifyContent: 'space-between' }}>
      {iconPathKeys.map((key) => (
        <div
          key={key}
          style={{ padding: '1rem', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon
            type={key}
            style={{ fontSize: '2rem' }}
          />
          <span style={{ marginTop: '0.4rem' }}>{key}</span>
        </div>
      ))}
    </div>
  )
}
