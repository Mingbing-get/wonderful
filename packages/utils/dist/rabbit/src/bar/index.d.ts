import React from 'react';
import './index.scss';
declare type Props = {
    refDom: React.RefObject<HTMLElement>;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    onStart?: () => void;
    onEnd?: () => void;
};
export default function PortalBar(props: Props): React.ReactPortal;
export {};
