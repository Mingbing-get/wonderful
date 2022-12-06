/// <reference types="react" />
import { Marrow } from '@marrow/global';
import './index.scss';
declare type Props = {
    marrows: Marrow[];
    onChange?: (marrows: Marrow[]) => void;
};
export default function Build({ marrows, onChange }: Props): JSX.Element;
export {};
