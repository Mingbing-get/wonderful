import React, { useState } from 'react'
import { Transfer, TransferOptionType } from '@marrow/rabbit'

const data: TransferOptionType[][] = [
  [{
    value: 10,
    label: '第一个',
  }, {
    value: 11,
    label: '第一一个',
    disabled: true,
  },{
    value: 12,
    label: '第一二个'
  }],
  [{
    value: 20,
    label: '第二个'
  }],
  [{
    value: 30,
    label: '第三个'
  }]
]

function createData(count: number, itemCount: number, pre: string = ''): TransferOptionType[][] {
  return new Array(count).fill(0).map((_, index) => {
    return new Array(itemCount).fill(0).map((_, itemIndex) => ({
      label: `${pre}第${index}-${itemIndex}个`,
      value: `${pre}${index}${itemIndex}`
    }))
  })
}

export default function ExampleTransfer() {
  const [vData, setVData] = useState(createData(3, 100))

  return (
    <div>
      <Transfer data={data} />
      <br />
      <Transfer data={data} showSearch />
      <br />
      <Transfer
        data={data}
        titles={['第一部分', '第二部分', '第三部分']}
        showSelectAll={[true, false, false]}
        selectAllLabels='selected all'
        selectInvertLabels={['selected invert1', 'selected invert2', 'selected invert3']}
        oneWay={[true, false]}
      />
      <br />
      <Transfer
        data={data}
        btnRender={(_, dir) => {
          if (dir === 'left') return 'to left'
          return 'to right'
        }}
        footerRender={(index) => {
          return `${index} custom footer`
        }}
      />
      <br />
      <Transfer
        data={vData}
        onChange={(data) => {
          console.log(data)
        }}
        virtualScroll={{
          height: 150,
          itemHeight: 30
        }}
        loadMore={[
          {
            onLoad: () => {
              setTimeout(() => {
                const newData = createData(1, 10, 'load-' + vData[0].length + '-')
                vData.splice(0, 1, [...vData[0], ...newData[0]])
                setVData([...vData])
              }, 1000);
            }
          }
        ]}
      />
    </div>
  )
}