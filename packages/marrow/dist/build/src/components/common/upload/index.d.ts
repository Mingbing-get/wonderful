import React from 'react';
import './index.scss';
declare type BaseProps = {
    children?: React.ReactNode;
};
declare type SingleProps = BaseProps & {
    source?: string;
    multiple?: false;
    onChange?: (value?: ImgDesc) => void;
};
declare type MultipleProps = BaseProps & {
    source?: string[];
    multiple: true;
    limit?: number;
    onChange?: (value: ImgDesc[]) => void;
};
declare type Props = SingleProps | MultipleProps;
export declare type ImgDesc = {
    key: string;
    type?: string;
    src?: string;
    base64?: string;
    originPath?: string;
};
export default function Upload({ source, children, multiple, onChange, ...extra }: Props): JSX.Element;
export {};
