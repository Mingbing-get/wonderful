import React from 'react'
import { Button } from '../../../rabbit/src'

export default function ExampleButton() {
  return (
    <div>
      <p>普通：</p>
      <Button>确认</Button>
      <Button type="primary">确认</Button>
      <Button type="success">确认</Button>
      <Button type="danger">确认</Button>
      <Button type="warning">确认</Button>

      <p>ghost：</p>
      <Button ghost>确认</Button>
      <Button
        type="primary"
        ghost>
        确认
      </Button>
      <Button
        type="success"
        ghost>
        确认
      </Button>
      <Button
        type="danger"
        ghost>
        确认
      </Button>
      <Button
        type="warning"
        ghost>
        确认
      </Button>

      <p>disabled: </p>
      <Button disabled>确认</Button>
      <Button
        type="primary"
        disabled>
        确认
      </Button>
      <Button
        type="success"
        disabled>
        确认
      </Button>
      <Button
        type="danger"
        disabled>
        确认
      </Button>
      <Button
        type="warning"
        disabled>
        确认
      </Button>

      <p>ghost + disabled: </p>
      <Button
        ghost
        disabled>
        确认
      </Button>
      <Button
        type="primary"
        ghost
        disabled>
        确认
      </Button>
      <Button
        type="success"
        ghost
        disabled>
        确认
      </Button>
      <Button
        type="danger"
        ghost
        disabled>
        确认
      </Button>
      <Button
        type="warning"
        ghost
        disabled>
        确认
      </Button>

      <p>loading: </p>
      <Button loading>确认</Button>
      <Button
        type="primary"
        loading>
        确认
      </Button>
      <Button
        type="success"
        loading>
        确认
      </Button>
      <Button
        type="danger"
        loading>
        确认
      </Button>
      <Button
        type="warning"
        loading>
        确认
      </Button>

      <p>ghost + loading: </p>
      <Button
        ghost
        loading>
        确认
      </Button>
      <Button
        type="primary"
        ghost
        loading>
        确认
      </Button>
      <Button
        type="success"
        ghost
        loading>
        确认
      </Button>
      <Button
        type="danger"
        ghost
        loading>
        确认
      </Button>
      <Button
        type="warning"
        ghost
        loading>
        确认
      </Button>

      <p>round：</p>
      <Button round>确认</Button>
      <Button
        round
        type="primary">
        确认
      </Button>
      <Button
        round
        type="success">
        确认
      </Button>
      <Button
        round
        type="danger">
        确认
      </Button>
      <Button
        round
        type="warning">
        确认
      </Button>

      <p>block: </p>
      <Button block>确认</Button>
      <Button
        block
        type="primary">
        确认
      </Button>
      <Button
        block
        type="success">
        确认
      </Button>
      <Button
        block
        type="danger">
        确认
      </Button>
      <Button
        block
        type="warning">
        确认
      </Button>
    </div>
  )
}
