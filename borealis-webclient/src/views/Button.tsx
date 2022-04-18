import React, { CSSProperties, ForwardedRef, forwardRef } from 'react'

interface ButtonProps {
    title: string,
    value: JSX.Element,
    onClick: (arg0: React.MouseEvent<HTMLButtonElement>) => void,
    isSelected?: boolean,
    style?: CSSProperties,
    disabled?: boolean,
    customClass?: string,
    customSelectedClass?: string,
}

const Button = forwardRef(({ title, value, onClick, isSelected, style, disabled, customClass, customSelectedClass }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
    const className = customClass ? customClass : 'button'
    const selectedClassName = customSelectedClass ? customSelectedClass : 'selected-button'

    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? selectedClassName : className } style={ style } disabled={ disabled } ref={ ref }>
            <span role='img' aria-label={ title }>{ value }</span>
        </button>
    )
})
Button.displayName = 'Button'

export default Button
