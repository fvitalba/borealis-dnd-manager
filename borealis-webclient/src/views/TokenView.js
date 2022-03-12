const TokenView = ({ divStyle, token, isSelected, classes, imgStyle, onMouseDown }) => {
    return (
        <div style={ divStyle } title={ token.name } className={ classes.join(' ') } onMouseDown={ (e) => onMouseDown(e) }>
            <img className={ isSelected ? 'token-image-selected' : 'token-image' } src={ token.url } alt={ token.name ||'' } style={ imgStyle } />
            { token.showLabel ? <label className='token-label'>{ token.name }</label> : null }
        </div>
    )
}

export default TokenView
