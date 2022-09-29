import { ChangeEvent } from 'react'

export interface NumberInputProps {
    title?: string,
    value: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    step?: number,
    min?: number,
    label?: string,
    autofocus?: boolean,
}
