import React, { useState, useEffect } from 'react'
import Icon from '../icon'

import { toBase64, generateKey, getTypeByPath } from './utils'

import './index.scss'

type BaseProps = {
  children?: React.ReactNode;
}
type SingleProps = BaseProps & {
  source?: string;
  multiple?: false;
  onChange?: (value?: ImgDesc) => void;
}
type MultipleProps = BaseProps & {
  source?: string[];
  multiple: true;
  limit?: number;
  onChange?: (value: ImgDesc[]) => void;
}

type Props = SingleProps | MultipleProps

export type ImgDesc = {
  key: string;
  type?: string;
  src?: string;
  base64?: string;
  originPath?: string;
}

export default function Upload({
  source,
  children,
  multiple,
  onChange,
  ...extra
}: Props) {
  const { limit } = extra as Pick<MultipleProps, 'limit'>

  const [imgList, setImgList] = useState<ImgDesc[]>([])
  const [showHandle, setShowHandle] = useState(true)

  useEffect(() => {
    if (!source) return
    if (multiple) {
      const imgList: ImgDesc[] = []
      source.forEach(src => {
        imgList.push({
          key: generateKey(),
          src
        })
      })
      setImgList(imgList)
    } else {
      setImgList([{
        key: generateKey(),
        src: source
      }])
    }
  }, [])

  useEffect(() => {
    if (multiple) {
      if (!!limit) {
        if (imgList.length > limit) {
          setImgList(imgList.slice(0, limit))
        }
        setShowHandle(imgList.length < limit)
      }
    } else {
      if (imgList.length > 1) {
        setImgList([imgList[0]])
      }

      setShowHandle(imgList.length === 0)
    }
  }, [imgList])

  function _onChange(newImgList: ImgDesc[]) {
    if (multiple) {
      onChange?.(newImgList)
    } else {
      onChange?.(newImgList[0])
    }
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    
    const path = e.target.value
    const base64 = await toBase64(file)
    e.target.value = ''
    const newImgList = [...imgList, {
      key: generateKey(),
      type: getTypeByPath(path),
      originPath: path,
      base64: base64 as string
    }]
    setImgList(newImgList)
    _onChange(newImgList)
  }

  function handleDelete(key: string) {
    const index = imgList.findIndex(item => item.key === key)
    if (index === -1) return

    imgList.splice(index, 1)
    setImgList([...imgList])
    _onChange(imgList)
  }

  return (
    <div className='rabbit-image-picker-wrapper'>
      {
        imgList.map(item => (
          <div className='image-picker-item' key={item.key}>
            <img src={item.src || item.base64}/>
            <div className='image-picker-action'>
              <span onClick={() => handleDelete(item.key)}>
                <Icon type='delete' style={{ color: 'red' }} />
              </span>
            </div>
          </div>
        ))
      }
      {
        showHandle && (
          <label className='image-picker-handle'>
            {children}
            <input type='file' accept='image/*' onChange={handleChange} />
          </label>
        )
      }
    </div>
  )
}
