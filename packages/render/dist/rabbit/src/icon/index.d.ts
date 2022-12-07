import { SVGProps } from 'react';
import './index.scss';
declare const pathMap: {
    add: JSX.Element;
    scissor: JSX.Element;
    expand: JSX.Element;
    shrink: JSX.Element;
    repeat: JSX.Element;
    arrowDown: JSX.Element;
    arrowUp: JSX.Element;
    arrowLeft: JSX.Element;
    arrowRight: JSX.Element;
    loading: JSX.Element;
    close: JSX.Element;
    delete: JSX.Element;
};
export declare type Props = {
    type: keyof (typeof pathMap);
    className?: string;
} & SVGProps<any>;
export default function Icon({ type, className, ...extra }: Props): JSX.Element;
export {};
