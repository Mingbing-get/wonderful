import { InputProps } from './input'

export type InputNumberProps = Omit<InputProps, 'onChange' | 'defaultValue' | 'value'> & {
  defaultValue?: number,
  value?: number;
  step?: number | null;
  min?: number;
  max?: number;
  showStepBtn?: boolean;
  onChange?: (value?: number) => void;
}