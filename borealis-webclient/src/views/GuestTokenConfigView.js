const GuestTokenConfigView = ({ token, onTextChange, onIntegerChange }) => {
	//TODO: Review after refactoring
	return (
		<div className='tokenConfig'>
			<input value={ token.name || '' } placeholder='Name' size='8' onChange={ onTextChange.bind(this, 'name') } />
			<input value={ token.url || '' } placeholder='Url' size='8' onChange={ onTextChange.bind(this, 'url') } />
			wh:
			<input value={ token.w || '' } placeholder='w' className='text2' onChange={ onIntegerChange.bind(this, 'w') } type='number' step='5' min='0' title='width' />
			<input value={ token.h || '' } placeholder='h' className='text2' onChange={ onIntegerChange.bind(this, 'h') } type='number' step='5' min='0' title='height' />
			xy:
			<input value={ token.x || '' } placeholder='x' className='text3' onChange={ onIntegerChange.bind(this, 'x') } type='number' step='5' title='x coord' />
			<input value={ token.y || '' } placeholder='y' className='text3' onChange={ onIntegerChange.bind(this, 'y') } type='number' step='5' title='y coord' />
		</div>
	)
}

export default GuestTokenConfigView
