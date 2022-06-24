import React, { ReactNode } from 'react'

interface FormContainerProps {
    children: ReactNode,
}

const FormContainer = ({ children }: FormContainerProps) => {
    return (<div className='borealis-form-container'>
        { children }
    </div>)
}

export default FormContainer
