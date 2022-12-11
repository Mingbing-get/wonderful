import React from 'react';
export declare type PanelProps = {
    header: React.ReactNode;
    panelKey: React.Key;
    children: React.ReactElement;
    isOpen?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onToggleOpen?: (key: React.Key) => void;
};
export default function Panel({ header, panelKey, isOpen, children, className, style, onToggleOpen }: PanelProps): JSX.Element;
