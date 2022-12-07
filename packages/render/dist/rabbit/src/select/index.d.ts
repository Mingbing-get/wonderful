import React from 'react';
import './index.scss';
export declare type ValueType = number | string;
export declare type OptionType<T> = {
    value: T;
    label?: React.ReactNode;
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
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
    onChange?: (value?: T) => void;
};
export default function Select<T extends ValueType>({ defaultValue, value, options, className, style, wrapperClassName, wrapperStyle, onChange }: Props<T>): JSX.Element;
export {};
