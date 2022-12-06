/// <reference types="react" />
export default function useActions(): {
    icon: JSX.Element;
    key: string;
    onClick: (id: string) => void;
}[];
