import React, { ChangeEvent, ReactElement } from 'react'

interface OptionSelectorProps {
    title?: string,
    value: string,
    options: Array<ReactElement>,
    onChange: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    disabled?: boolean,
    label?: string,
}

const OptionSelector = ({ title, value, options, onChange, disabled, label }: OptionSelectorProps) => {
    return (<div className='borealis-select-container'>
        { label
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <select value={ value } onChange={ onChange } title={ title } className='borealis-select' disabled={ disabled }>
            { options.map(option => option) }
        </select>
    </div>)
}

export default OptionSelector
