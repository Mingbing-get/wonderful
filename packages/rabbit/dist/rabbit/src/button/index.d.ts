import React from 'react';
import './index.scss';
export declare type ButtonType = 'primary' | 'danger' | 'success' | 'warning';
declare type Props = {
    type?: ButtonType;
    loading?: boolean;
    block?: boolean;
    disabled?: boolean;
    ghost?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
};
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export default _default;
