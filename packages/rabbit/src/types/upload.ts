export type UploadImgDesc = {
  key: string
  type?: string
  src?: string
  base64?: string
  originPath?: string
}

export type BaseUploadProps = {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
export type SingleUploadProps = BaseUploadProps & {
  source?: string
  multiple?: false
  onChange?: (value?: UploadImgDesc) => void
}
export type MultipleUploadProps = BaseUploadProps & {
  source?: string[]
  multiple: true
  limit?: number
  onChange?: (value: UploadImgDesc[]) => void
}

export type UploadProps = SingleUploadProps | MultipleUploadProps
