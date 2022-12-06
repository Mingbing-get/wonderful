/// <reference types="react" />
declare type Props = {
    value?: number | string;
    suffix?: string;
    onChange?: (value?: number | string) => void;
};
export default function ({ value, suffix, onChange }: Props): JSX.Element;
export {};
