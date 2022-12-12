import React from 'react';
import { Placement } from '@popperjs/core';
import './index.scss';
declare type Props = {
    children: React.ReactElement;
    content: React.ReactElement;
    trigger?: 'click' | 'hover' | 'focus';
    arrow?: 'small' | 'large' | 'middle';
    placement?: Placement;
    visible?: boolean;
    delay?: number;
    className?: string;
    onVisibleChange?: (visible: boolean) => void;
};
export default function Popover({ children, content, trigger, placement, arrow, visible, delay, className, onVisibleChange }: Props): JSX.Element;
export {};