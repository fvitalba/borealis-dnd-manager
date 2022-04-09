import { forwardRef } from 'react'

const Button = forwardRef(({ title, value, onClick, isSelected, style, disabled, customClass, customSelectedClass, ...additionalAttr }, ref) => {
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
