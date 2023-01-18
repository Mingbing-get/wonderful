import React from 'react'
import { Pagination } from '@marrow/rabbit'

export default function ExamplePagination() {
  return (
    <div>
      <Pagination total={59} />
      <Pagination
        total={100}
        showItemCount={5}
        showQuickJumper
        pageSizeOptions={[6, 10, 20, 50]}
        showTotal={(total, range) => `当前${range[0]}-${range[1]} 共${total}条`}
        onChange={(current, pageSize) => console.log(current, pageSize)}
        onPageSizeChange={(current, pageSize) => console.log(current, pageSize)}
      />
      <Pagination
        total={100}
        disabled
        showItemCount={5}
        showQuickJumper
        pageSizeOptions={[6, 10, 20, 50]}
        showTotal={(total, range) => `当前${range[0]}-${range[1]} 共${total}条`}
      />
      <Pagination
        total={100}
        simple
      />
      <Pagination
        total={100}
        simple
        disabled
      />
    </div>
  )
}