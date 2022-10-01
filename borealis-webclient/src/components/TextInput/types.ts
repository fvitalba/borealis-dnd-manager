import { ChangeEvent, KeyboardEvent } from 'react'

export interface TextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (event: KeyboardEvent) => void,
    label?: string,
    autofocus?: boolean,
}
