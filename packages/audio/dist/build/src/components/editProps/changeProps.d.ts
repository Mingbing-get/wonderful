/// <reference types="react" />
import { FormGridItem, FormGroup } from './formGrid';
import { Marrow } from '@marrow/global';
export declare type ChangeFn = (path: (string | number)[], value: any) => void;
export declare type GetFormGridItems = (currentMarrow: Marrow, handleChange: ChangeFn) => FormGridItem[];
declare type Props = {
    getFormGridItems: GetFormGridItems;
    groups?: FormGroup[];
};
export default function ChangeProps({ getFormGridItems, groups }: Props): JSX.Element;
export {};
