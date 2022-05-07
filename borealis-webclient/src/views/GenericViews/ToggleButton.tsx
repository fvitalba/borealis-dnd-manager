import React, { ReactElement } from 'react'

interface ToggleButtonProps {
    title: string,
    value: ReactElement,
    disabled?: boolean,
    isActive?: boolean,
    toggleValue: () => void,
}

const ToggleButton = ({ title, value, disabled, isActive, toggleValue }: ToggleButtonProps) => {
    const buttonClass = isActive ? 'borealis-toggle-button-active' : 'borealis-toggle-button'

    const onClick = () => {
        toggleValue()
    }

    return (
        <button title={ title } onClick={ onClick } className={ buttonClass } disabled={ disabled }>
            <span role='img' aria-label={ title } className='borealis-toggle-button-content'>{ value }</span>
        </button>
    )
}

export default ToggleButton
