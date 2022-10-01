import React from 'react'
import { TextInputProps } from './types'

const TextInput = ({ title, placeholder, value, onChange, onKeyDown, label, autofocus }: TextInputProps) => {
    return (<div className='borealis-text-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <input title={ title } placeholder={ placeholder } type='text' value={ value } onChange={ onChange } onKeyDown={ onKeyDown } className='borealis-text-input' autoFocus={ autofocus } />
    </div>)
}

export default TextInput
