import { CSSProperties, MouseEvent, ReactElement } from 'react'

export interface ButtonProps {
    title: string,
    value: ReactElement,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void,
    id?: string,
    isSelected?: boolean,
    style?: CSSProperties,
    disabled?: boolean,
    customClass?: string,
    customSelectedClass?: string,
}
