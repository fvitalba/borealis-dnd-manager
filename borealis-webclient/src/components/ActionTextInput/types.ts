import { ChangeEvent, MouseEvent, ReactElement } from 'react'

export interface ActionTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    autofocus?: boolean,
    buttonValue: ReactElement,
    onClick: (event?: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}
