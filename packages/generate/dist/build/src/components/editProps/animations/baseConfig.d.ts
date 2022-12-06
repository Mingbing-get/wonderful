/// <reference types="react" />
import { Marrow } from '@marrow/global';
import { FormGroup } from '../formGrid';
import { ChangeFn } from '../changeProps';
export declare function getBaseItems(marrow: Marrow, basePath: (string | number)[], handleChange: ChangeFn): {
    key: string;
    label: string;
    content: JSX.Element;
}[];
export declare const baseGroup: FormGroup;
