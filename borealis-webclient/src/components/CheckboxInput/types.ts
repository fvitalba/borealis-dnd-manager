import { ChangeEvent } from 'react'

export interface CheckboxInputProps {
    title?: string,
    value: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    disabled?: boolean,
}
