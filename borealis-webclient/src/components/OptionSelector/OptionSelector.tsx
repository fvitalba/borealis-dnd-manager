import React from 'react'
import { OptionSelectorProps } from './types'

const OptionSelector = ({ title, value, options, onChange, disabled, label }: OptionSelectorProps) => {
    return (<div className='borealis-select-container'>
        { label
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <select value={ value } onChange={ onChange } title={ title } className='borealis-select' disabled={ disabled }>
            { options.map(option => <option key={ option.key } value={ option.value } >{ option.caption }</option>) }
        </select>
    </div>)
}

export default OptionSelector
