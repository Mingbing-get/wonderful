/// <reference types="react" />
import { ElementType, Marrow } from '@marrow/global';
declare const elements: {
    type: string;
    elementName: string;
    icon: JSX.Element;
}[];
export declare function createElement(elementType: ElementType): Marrow;
export declare function getElementName(type: string): string;
export default elements;
