/// <reference types="react" />
import './index.scss';
declare type Props = {
    value?: number;
    onChange?: (value?: number) => void;
};
export default function InputRotate({ value, onChange }: Props): JSX.Element;
export {};
