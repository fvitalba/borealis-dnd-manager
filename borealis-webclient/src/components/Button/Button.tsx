import React, { ForwardedRef, forwardRef } from 'react'
import { ButtonProps } from './types'

const Button = forwardRef(({ title, value, onClick, id, isSelected, style, disabled, customClass, customSelectedClass }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
    const className = customClass ? customClass : 'button'
    const selectedClassName = customSelectedClass ? customSelectedClass : 'selected-button'

    return (
        <button id={ id } title={ title } onClick={ onClick } className={ isSelected ? selectedClassName : className } style={ style } disabled={ disabled } ref={ ref }>
            <span role='img' aria-label={ title }>{ value }</span>
        </button>
    )
})
Button.displayName = 'Button'

export default Button
