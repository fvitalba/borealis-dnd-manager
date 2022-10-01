import React from 'react'
import { NumberInputProps } from './types'

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
