import React from 'react'
import { FormRowProps } from './types'

const FormRow = ({ children, reverseDirection }: FormRowProps) => {
    const directionClass = reverseDirection ? 'flex-row-reverse' : 'flex-row'
    return (<div className={ `${directionClass} borealis-form-row` }>
        { children }
    </div>)
}

export default FormRow
