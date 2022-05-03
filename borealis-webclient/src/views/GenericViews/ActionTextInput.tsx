import React, { ChangeEvent, MouseEvent, ReactElement } from 'react'

interface ActionTextInputProps {
    title?: string,
    placeholder?: string,
    value: string,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    autofocus?: boolean,
    buttonValue: ReactElement,
    onClick: (arg0: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}

const ActionTextInput = ({ title, placeholder, value, onChange, label, buttonValue, onClick, disabled, autofocus }: ActionTextInputProps) => {
    return (<div className='borealis-text-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <input title={ title } placeholder={ placeholder } type='text' value={ value } onChange={ onChange } className='borealis-text-input' autoFocus={ autofocus } />
        <button onClick={ onClick } className={ 'borealis-action-text-input-button' } disabled={ disabled }>
            <span role='img' aria-label={ title } className='borealis-action-text-input-button-content'>{ buttonValue }</span>
        </button>
    </div>)
}

export default ActionTextInput
