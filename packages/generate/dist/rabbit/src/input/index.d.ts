import React from 'react';
import './index.scss';
export declare type InputValue = number | string;
declare type Props = {
    defaultValue?: InputValue;
    value?: InputValue;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    readonly?: boolean;
    prefix?: React.ReactNode;
    control?: React.ReactNode;
    suffix?: React.ReactNode;
    splitFix?: boolean;
    onChange?: (value?: InputValue) => void;
};
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export default _default;
