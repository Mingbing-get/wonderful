import { SVGProps } from 'react';
import './index.scss';
declare const pathMap: {
    add: JSX.Element;
    scissor: JSX.Element;
    expand: JSX.Element;
    shrink: JSX.Element;
    repeat: JSX.Element;
};
export declare type Props = {
    type: keyof (typeof pathMap);
    className?: string;
} & SVGProps<any>;
export default function Icon({ type, className, ...extra }: Props): JSX.Element;
export {};
