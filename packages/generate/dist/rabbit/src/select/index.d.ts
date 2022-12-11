import React from 'react';
import './index.scss';
export declare type ValueType = number | string;
export declare type OptionType<T> = {
    value: T;
    label?: string;
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
    [k: string]: any;
    onClick?: (value: T) => void;
};
declare type Props<T extends ValueType> = {
    defaultValue?: T;
    value?: T;
    options: OptionType<T>[];
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
    onChange?: (value?: T) => void;
};
export default function Select<T extends ValueType>({ defaultValue, value, options, className, style, placeholder, wrapperClassName, wrapperStyle, onChange }: Props<T>): JSX.Element;
export {};
