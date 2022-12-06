/// <reference types="react" />
import { ChangeFn } from '../changeProps';
import { Marrow } from '@marrow/global';
declare type Props = {
    marrow: Marrow;
    handleChange: ChangeFn;
};
export default function LoopStylePicker({ marrow, handleChange }: Props): JSX.Element;
export {};
