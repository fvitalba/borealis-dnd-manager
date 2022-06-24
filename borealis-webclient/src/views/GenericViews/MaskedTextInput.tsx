import React, { ChangeEvent } from 'react'

interface MaskedTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean,
}

const MaskedTextInput = ({ title, placeholder, value, onChange, disabled }: MaskedTextInputProps) => {
    return (<div className='borealis-text-input-container'>
        <input title={ title } placeholder={ placeholder } type='password' value={ value } onChange={ onChange } className='borealis-text-input' disabled={ disabled } />
    </div>)
}

export default MaskedTextInput
