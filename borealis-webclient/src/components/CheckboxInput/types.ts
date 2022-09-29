import { ChangeEvent } from 'react'

export interface CheckboxInputProps {
    title?: string,
    value: boolean,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    disabled?: boolean,
}
