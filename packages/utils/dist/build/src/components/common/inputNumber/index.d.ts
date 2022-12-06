import React from 'react';
declare type Props = {
    value?: number;
    suffix?: string;
    style?: React.CSSProperties;
    onChange?: (value?: number) => void;
};
export default function ({ value, suffix, style, onChange }: Props): JSX.Element;
export {};
