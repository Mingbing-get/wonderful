/// <reference types="react" />
import { Marrow } from '@marrow/global';
import MarrowController from './marrowController';
import './index.scss';
export { MarrowController };
declare type Props = {
    marrows: Marrow[];
    autoplay?: boolean;
};
export declare const marrowController: MarrowController;
export default function Render({ marrows, autoplay }: Props): JSX.Element;
