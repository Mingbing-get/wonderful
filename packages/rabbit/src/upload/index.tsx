import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Icon from '../icon'

import { toBase64, generateKey, getTypeByPath } from './utils'
import { UploadProps, MultipleUploadProps, UploadImgDesc } from '../types/upload'

import './index.scss'

function Upload({ source, children, multiple, onChange, style, className, ...extra }: UploadProps, ref?: React.ForwardedRef<HTMLDivElement>) {
  const { limit } = extra as Pick<MultipleUploadProps, 'limit'>

  const [imgList, setImgList] = useState<UploadImgDesc[]>([])
  const [showHandle, setShowHandle] = useState(true)

  useEffect(() => {
    if (!source) return
    if (multiple) {
      const imgList: UploadImgDesc[] = []
      source.forEach((src) => {
        imgList.push({
          key: generateKey(),
          src,
        })
      })
      setImgList(imgList)
    } else {
      setImgList([
        {
          key: generateKey(),
          src: source,
        },
      ])
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

  function _onChange(newImgList: UploadImgDesc[]) {
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
    const newImgList = [
      ...imgList,
      {
        key: generateKey(),
        type: getTypeByPath(path),
        originPath: path,
        base64: base64 as string,
      },
    ]
    setImgList(newImgList)
    _onChange(newImgList)
  }

  function handleDelete(key: string) {
    const index = imgList.findIndex((item) => item.key === key)
    if (index === -1) return

    imgList.splice(index, 1)
    setImgList([...imgList])
    _onChange(imgList)
  }

  return (
    <div
      className={classNames('rabbit-image-picker-wrapper', 'rabbit-component', className)}
      style={style}
      ref={ref}>
      {imgList.map((item) => (
        <div
          className="image-picker-item"
          key={item.key}>
          <img src={item.src || item.base64} />
          <div className="image-picker-action">
            <span onClick={() => handleDelete(item.key)}>
              <Icon
                type="delete"
                style={{ color: 'red' }}
              />
            </span>
          </div>
        </div>
      ))}
      {showHandle && (
        <label className="image-picker-handle">
          {children}
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, UploadProps>(Upload)
