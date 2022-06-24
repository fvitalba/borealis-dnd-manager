import React, { ReactNode } from 'react'

interface FormRowProps {
    children: ReactNode,
    reverseDirection?: boolean,
}

const FormRow = ({ children, reverseDirection }: FormRowProps) => {
    const directionClass = reverseDirection ? 'flex-row-reverse' : 'flex-row'
    return (<div className={ `${directionClass} borealis-form-row` }>
        { children }
    </div>)
}

export default FormRow
