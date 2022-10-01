import React from 'react'
import { FormContainerProps } from './types'

const FormContainer = ({ children }: FormContainerProps) => {
    return (<div className='borealis-form-container'>
        { children }
    </div>)
}

export default FormContainer
