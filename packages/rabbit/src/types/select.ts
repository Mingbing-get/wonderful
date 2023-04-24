export type SelectValueType = number | string;
export type SelectOptionType<T extends SelectValueType = SelectValueType> = {
  value: T;
  label?: string;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  [k: string]: any;
  onClick?: (value: T) => void;
}

export type SelectProps<T extends SelectValueType> = {
  defaultValue?: T;
  value?: T;
  options: SelectOptionType<T>[];
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  onChange?: (value?: T) => void;
}