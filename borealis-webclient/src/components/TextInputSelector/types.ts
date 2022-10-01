import { ReactNode } from 'react'

export interface TextInputOption {
    index: number,
    caption: string,
    icon?: ReactNode,
}

export interface TextInputSelectorProps {
    title?: string,
    placeholder?: string,
    value: string,
    onSelectElement: (selectedElementIndex: number) => void,
    label?: string,
    autofocus?: boolean,
    options?: Array<TextInputOption>,
}
