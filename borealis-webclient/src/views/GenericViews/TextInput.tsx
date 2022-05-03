import React, { ChangeEvent } from 'react'

interface TextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    autofocus?: boolean,
}

const TextInput = ({ title, placeholder, value, onChange, label, autofocus }: TextInputProps) => {
    return (<div className='borealis-text-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <input title={ title } placeholder={ placeholder } type='text' value={ value } onChange={ onChange } className='borealis-text-input' autoFocus={ autofocus } />
    </div>)
}

export default TextInput
