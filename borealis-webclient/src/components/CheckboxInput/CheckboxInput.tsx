import React, { useState } from 'react'
import { CheckAltOutlineIcon } from '@/styles/Icons'
import { CheckboxInputProps } from './types'

const CheckboxInput = ({ title, value, onChange, label, disabled }: CheckboxInputProps) => {
    const [focused, setFocused] = useState(false)
    const iconClass = value ? 'borealis-checkbox-icon-active' : 'borealis-checkbox-icon-inactive'

    const containerClass = disabled ? 'borealis-checkbox-input-container-disabled' : 'borealis-checkbox-input-container'
    const checkboxOverrideClass = (focused && !disabled) ? 'borealis-checkbox-input-override-focus' : 'borealis-checkbox-input-override'

    return (<div className={ containerClass }>
        <input title={ title } type='checkbox' checked={ value } onChange={ onChange } className='borealis-checkbox-input' disabled={ disabled } onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        <div className={ checkboxOverrideClass }>
            <CheckAltOutlineIcon className={ iconClass } />
        </div>
        { label !== undefined
            ? <label className='ml-2 borealis-input-label'>{ label }</label>
            : null
        }
    </div>)
}

export default CheckboxInput
