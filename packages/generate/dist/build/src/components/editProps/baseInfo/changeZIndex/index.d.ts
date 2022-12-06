/// <reference types="react" />
import { ElementType } from '@marrow/global';
import './index.scss';
declare type Props = {
    value?: number;
    marrowType: ElementType;
    onChange?: (val?: number) => void;
};
export default function ChangeZIndex({ value, marrowType, onChange }: Props): JSX.Element;
export {};
