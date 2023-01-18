import React from 'react'
import { Table } from '@marrow/rabbit'

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: 'test',
    lastName: 'test',
    other: 'other',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
          ? 'complicated'
          : 'single',
  }
}

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d: number) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export default function ExampleTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        Footer: 'test footer',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            Footer: 'test footer',
            // width: 300
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            // width: 200
          },
        ],
      },
      {
        Header: 'Info',
        Footer: 'test footer',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
      {
        Header: 'Add',
        accessor: 'other'
      }
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}