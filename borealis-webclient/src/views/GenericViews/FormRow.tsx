import React, { ReactNode } from 'react'

interface FormRowProps {
    children: ReactNode,
}

const FormRow = ({ children }: FormRowProps) => {
    return (<div className='borealis-form-row'>
        { children }
    </div>)
}

export default FormRow
