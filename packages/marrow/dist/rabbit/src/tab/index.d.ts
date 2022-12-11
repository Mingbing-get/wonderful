import React from 'react';
import TabItem from './item';
import './index.scss';
declare type Props = {
    defaultActiveKey?: React.Key;
    onChange?: (key: React.Key) => void;
    children: React.ReactElement[] | React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
};
declare function Tab({ defaultActiveKey, onChange, children, className, style }: Props): JSX.Element;
declare namespace Tab {
    var Item: typeof TabItem;
}
export default Tab;
