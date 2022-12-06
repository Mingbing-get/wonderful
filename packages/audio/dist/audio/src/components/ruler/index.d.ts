/// <reference types="react" />
import './index.scss';
declare type Props = {
    min: number;
    max: number;
    units: string[];
    radixs: number[];
    thresholds: number[];
    fixed?: number;
    minSpace?: number;
};
export default function Ruler({ min, max, units, radixs, thresholds, fixed, minSpace }: Props): JSX.Element;
export {};
