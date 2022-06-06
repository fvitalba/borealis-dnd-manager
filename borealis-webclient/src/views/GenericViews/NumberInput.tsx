import React, { ChangeEvent } from 'react'

interface NumberInputProps {
    title?: string,
    value: number,
    onChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    step?: number,
    min?: number,
    label?: string,
    autofocus?: boolean,
}

const NumberInput = ({ title, value, onChange, step, min, label, autofocus }: NumberInputProps) => {
    return (<div className='borealis-number-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <input size={ 3 } title={ title } type='number' value={ value } onChange={ onChange } step={ step } min={ min } className='borealis-number-input' autoFocus={ autofocus } />
    </div>)
}

export default NumberInput
