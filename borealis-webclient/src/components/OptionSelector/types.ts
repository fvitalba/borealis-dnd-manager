import { ChangeEvent } from 'react'

export interface SelectionOption {
    key: string | number,
    value: string | number,
    caption: string,
}

export interface OptionSelectorProps {
    title?: string,
    value: string | number,
    options: Array<SelectionOption>,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    disabled?: boolean,
    label?: string,
}
