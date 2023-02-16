import React, { useMemo } from 'react'
import { Table, Input, TableColumn } from '@marrow/rabbit'

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (d: number) => {
  const statusChance = Math.random()
  return {
    firstName: 'test' + d,
    lastName: 'test' + d,
    other: 'other',
    depKey: <Input />,
    depKey1: <div style={{ height: 10, width: 10, background: 'red', borderRadius: '50%' }} />,
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
  const makeDataLevel = (depth: number = 0): object[] => {
    const len = lens[depth]
    return range(len).map((d: number) => {
      return {
        ...newPerson(d),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      } as object
    })
  }

  return makeDataLevel()
}

export default function ExampleTable() {
  const columns: TableColumn[] = useMemo(
    () => [
      {
        Header: 'Name',
        Footer: 'test footer',
        fixed: 'left',
        columns: [
          {
            Header: <span>First Name</span>,
            accessor: 'firstName',
            Footer: 'test footer',
            onCell: (data, index) => {
              if (index === 0) {
                return {
                  rowSpan: 4,
                  color: 'red',
                }
              } else if (index < 4) {
                return {
                  rowSpan: 0
                }
              }
            },
            width: 100,
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            filter: {
              render: 'text',
            },
            width: 100,
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
            sort: {
              sortValue: 'desc'
            },
            width: 50
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            Footer: 'Visits footer',
            width: 50,
            onCell: (_, index) => {
              if (index === 2) {
                return {
                  rowSpan: 2,
                  colSpan: 2
                }
              }
              if (index === 3) {
                return {
                  rowSpan: 0
                }
              }
            }
          },
          {
            Header: 'Status',
            accessor: 'status',
            onCell: (_, index) => {
              if (index === 3 || index === 2) {
                return {
                  rowSpan: 0
                }
              }
            },
            filter: {
              render: 'checkbox'
            },
            sort: {
              customSort: (curRow, nextRow, dir) => {
                if (dir === 'none') return 0

                const statusList = ['relationship', 'single', 'complicated']
                const curIndex = statusList.findIndex(item => item === curRow.data['status'])
                const nextIndex = statusList.findIndex(item => item === nextRow.data['status'])
                const dirIndex = dir === 'asc' ? 1 : -1
                return (curIndex - nextIndex) * dirIndex
              }
            }
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            sort: {}
          },
        ],
      },
      {
        Header: 'maxDep',
        columns: [
          {
            Header: 'dep1',
            columns: [
              {
                Header: 'dep2',
                accessor: 'depKey'
              },
              {
                Header: 'dep21',
                accessor: 'depKey1',
                Footer: 'dep21 footer'
              }
            ]
          }
        ]
      },
      {
        Header: 'Add',
        accessor: 'other',
        fixed: 'right',
        width: 100
      }
    ],
    []
  )

  const data = useMemo(() => makeData(20), [])

  const vData = useMemo(() => makeData(1000), [])

  const rowSelection = useMemo(() => {
    return {
      onCurPageSelectedChange(ids: string[]) {
        console.log(ids)
      },
      onAfterFilterSelectedChange(ids: string[]) {
        console.log(ids)
      },
      onAllSelectedChange(ids: string[]) {
        console.log(ids)
      }
    }
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        pagination={{
          hideOnSinglePage: true
        }}
        rowSelection={rowSelection}
      />
      <br />
      <Table
        columns={columns}
        data={data}
        scroll={{ x: 1500, y: 500 }}
        rowSelection={{}}
      />
      <br />
      <div style={{ maxWidth: 1000 }}>
        <Table
          columns={columns}
          data={vData}
          scroll={{ x: 1500 }}
          virtualScrollY={{
            itemHeight: 42,
            height: 500
          }}
        />
      </div>
    </div>
  )
}