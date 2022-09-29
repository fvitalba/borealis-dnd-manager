import { ChangeEvent } from 'react'

export interface MaskedTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean,
}
