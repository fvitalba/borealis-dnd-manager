import { ChangeEvent, KeyboardEvent } from 'react'

export interface TextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (arg0: KeyboardEvent) => void,
    label?: string,
    autofocus?: boolean,
}
