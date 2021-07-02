const TokenView = ({ divStyle, token, classes, imgStyle, onMouseUp, onMouseDown }) => {
	//TODO: To review post Refactoring
	return (
		<div
			style={ divStyle }
			title={ token.name }
			className={ classes.join(' ') }
			onMouseUp={ onMouseUp.bind(this) }
			onMouseDown={ onMouseDown.bind(this) }>
			<img src={ token.url } alt={ token.name ||'' } style={ imgStyle } />
		</div>
	)
}

export default TokenView
