import { ReactElement } from 'react'

export interface ToggleButtonProps {
    title: string,
    value: ReactElement,
    disabled?: boolean,
    isActive?: boolean,
    toggleValue: () => void,
}
