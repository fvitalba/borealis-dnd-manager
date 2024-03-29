import React, { KeyboardEvent } from 'react'
import { ActionTextInputProps } from './types'

const ActionTextInput = ({ title, placeholder, value, onChange, label, buttonValue, onClick, disabled, autofocus }: ActionTextInputProps) => {
    const inputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    return (<div className='borealis-text-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <input title={ title } placeholder={ placeholder } type='text' value={ value } onChange={ onChange } className='borealis-text-input' autoFocus={ autofocus } onKeyDown={ inputOnKeyDown } />
        <button onClick={ onClick } className={ 'borealis-action-text-input-button' } disabled={ disabled }>
            <span role='img' aria-label={ title } className='borealis-action-text-input-button-content'>{ buttonValue }</span>
        </button>
    </div>)
}

export default ActionTextInput
