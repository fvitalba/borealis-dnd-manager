const TokenView = ({ divStyle, token, classes, imgStyle, onMouseDown }) => {
    return (
        <div style={ divStyle } title={ token.name } className={ classes.join(' ') } onMouseDown={ (e) => onMouseDown(e) }>
            <img className='token-image' src={ token.url } alt={ token.name ||'' } style={ imgStyle } />
        </div>
    )
}

export default TokenView
