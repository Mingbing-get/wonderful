import { Marrow } from '@marrow/global';
import { FormGridItem, FormGroup } from './formGrid';
import { ChangeFn } from './changeProps';
export declare function getNumberValue(value?: number | string): number | undefined;
export declare function addSuffix(suffix: string, value?: string | number): string | undefined;
export declare function getValueByPath(object: any, basePath: (string | number)[], key: string): string | number | undefined;
export declare function getItems(marrow: Marrow, basePath: (string | number)[], handleChange: ChangeFn): FormGridItem[];
export declare const groups: FormGroup[];
