export interface CommonInputProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  inputClassName?: string
  inputStyle?: React.CSSProperties
  allowClear?:
    | boolean
    | {
        clearIcon?: React.ReactNode
      }
}

export interface InputProps extends CommonInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {}

export type InputRef = HTMLInputElement | null
