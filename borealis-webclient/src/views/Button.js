const Button = ({ title, value, onClick, isSelected, style, disabled }) => {
    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? 'selected-button' : 'button' } style={ style } disabled={ disabled }>
            <span role='img' aria-label={ title }>{ value }</span>
        </button>
    )
}

export default Button
