import { ChangeEvent, MouseEvent, ReactElement } from 'react'

export interface ActionTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    autofocus?: boolean,
    buttonValue: ReactElement,
    onClick: (arg0?: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}
