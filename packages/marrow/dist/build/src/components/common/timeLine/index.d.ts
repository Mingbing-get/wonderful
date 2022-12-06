/// <reference types="react" />
import './index.scss';
export declare type Node = {
    label?: string;
    key: string;
    index: number;
};
declare type Props = {
    nodes: Node[];
    selectIndex?: number;
    onAdd?: () => void;
    onDelete?: (node: Node) => void;
    onPick?: (node: Node) => void;
};
export default function TimeLine({ nodes, selectIndex, onAdd, onDelete, onPick }: Props): JSX.Element;
export {};
