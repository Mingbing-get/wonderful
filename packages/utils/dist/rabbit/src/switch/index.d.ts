/// <reference types="react" />
import './index.scss';
declare type Props = {
    value?: boolean;
    yesText?: string;
    noText?: string;
    onChange?: (value: boolean) => void;
};
export default function Switch({ value, yesText, noText, onChange }: Props): JSX.Element;
export {};
