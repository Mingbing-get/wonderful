import React from 'react';
import { ButtonType } from '../button';
import './index.scss';
export declare type ModalPlacement = 'center' | 'bottom' | 'top' | 'left' | 'right';
export declare type FooterButtonConfig = {
    text: string;
    type?: ButtonType;
    onClick?: () => void;
};
declare type Props = {
    header?: React.ReactNode;
    content: React.ReactNode;
    footer?: FooterButtonConfig[];
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    placement?: ModalPlacement;
    style?: React.CSSProperties;
    className?: string;
    onVisibleChange?: (visible: boolean) => void;
    onClose?: () => void;
    getContainer?: () => HTMLElement;
};
export default function Modal({ header, content, footer, visible, width, height, placement, style, className, onClose, onVisibleChange, getContainer }: Props): JSX.Element;
export {};
