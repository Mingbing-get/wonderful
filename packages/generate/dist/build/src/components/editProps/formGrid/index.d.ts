/// <reference types="react" />
import './index.scss';
export declare type FormGridItem = {
    key: string;
    label: string;
    content: JSX.Element;
};
export declare type FormGroup = {
    key: string;
    label: string;
    includeKeys: string[];
};
declare type Props = {
    items: FormGridItem[];
    formGroup?: FormGroup[];
};
export default function FormGrid({ items, formGroup }: Props): JSX.Element;
export {};
