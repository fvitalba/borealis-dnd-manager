import React, { CSSProperties, ForwardedRef, forwardRef, MouseEvent, ReactElement } from 'react'

interface ButtonProps {
    title: string,
    value: ReactElement,
    onClick: (arg0: MouseEvent<HTMLButtonElement>) => void,
    id?: string,
    isSelected?: boolean,
    style?: CSSProperties,
    disabled?: boolean,
    customClass?: string,
    customSelectedClass?: string,
}

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
