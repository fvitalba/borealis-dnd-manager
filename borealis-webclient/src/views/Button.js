const Button = ({ title, value, onClick, isSelected, style, disabled, customClass, customSelectedClass }) => {
    const className = customClass ? customClass : 'button'
    const selectedClassName = customSelectedClass ? customSelectedClass : 'selected-button'

    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? selectedClassName : className } style={ style } disabled={ disabled }>
            <span role='img' aria-label={ title }>{ value }</span>
        </button>
    )
}

export default Button
