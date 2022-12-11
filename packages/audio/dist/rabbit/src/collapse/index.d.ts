import React from 'react';
import './index.scss';
declare type Props = {
    className?: string;
    style?: React.CSSProperties;
    isOpenOnly?: boolean;
    children: React.ReactElement[] | React.ReactElement;
};
declare function Collapse({ className, style, isOpenOnly, children }: Props): JSX.Element;
declare namespace Collapse {
    var Panel: typeof import("./panel").default;
}
export default Collapse;
