/// <reference types="react" />
import './index.scss';
declare type Props = {
    value?: string;
    onChange: (value?: string) => void;
};
export default function ColorPicker({ value, onChange }: Props): JSX.Element;
export {};
