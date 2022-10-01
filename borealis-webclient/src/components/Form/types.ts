import { ReactNode } from 'react'

export interface FormContainerProps {
    children: ReactNode,
}

export interface FormRowProps {
    children: ReactNode,
    reverseDirection?: boolean,
}
