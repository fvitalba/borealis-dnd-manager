import { ChangeEvent } from 'react'

export interface MaskedTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean,
}
