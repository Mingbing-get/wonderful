/// <reference types="react" />
import { OptionType, ValueType } from './index';
import './index.scss';
export default function Option<T extends ValueType>({ className, style, value, label, prefix, suffix, onClick }: OptionType<T>): JSX.Element;
