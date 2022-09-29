import { ChangeEvent } from 'react'

export interface NumberInputProps {
    title?: string,
    value: number,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    step?: number,
    min?: number,
    label?: string,
    autofocus?: boolean,
}
