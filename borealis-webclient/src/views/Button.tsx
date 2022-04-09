import { CSSProperties, ForwardedRef, forwardRef } from 'react'

interface ButtonProps {
    title: string,
    value: JSX.Element,
    onClick: () => void,
    isSelected?: boolean,
    style?: CSSProperties,
    disabled?: boolean,
    customClass?: string,
    customSelectedClass?: string,
}

const Button = forwardRef(({ title, value, onClick, isSelected, style, disabled, customClass, customSelectedClass, ...additionalAttr } : ButtonProps, ref : ForwardedRef<HTMLButtonElement>): JSX.Element => {
    const className = customClass ? customClass : 'button'
    const selectedClassName = customSelectedClass ? customSelectedClass : 'selected-button'

    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? selectedClassName : className } style={ style } disabled={ disabled } ref={ ref } { ...additionalAttr }>
            <span role='img' aria-label={ title }>{ value }</span>
        </button>
    )
})
Button.displayName = 'Button'

export default Button
