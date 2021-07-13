import Button from './Button.js'

const MapConfigView = ({ isSelected, mapConfigState, mapId, load, onTextChange, onIntegerChange, deleteMap }) => {
	return (
		<div className={ isSelected ? 'selected' : null }>
			{ mapId }
			<input value={ mapConfigState.name || '' } placeholder='Map name' size='8' onChange={ (e) => onTextChange('name', e) } />
			<input value={ mapConfigState.imageUrl || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('imageUrl', e) } />
			<Button title='Load map' value='&#x1f23a;' onClick={ load } />
			wh:
			<input value={ mapConfigState.width || '' } placeholder='w' className='text3' onChange={ (e) => onIntegerChange('width', e) } type='number' min='0' step='5' title='width' />
			<input value={ mapConfigState.height || '' } placeholder='h' className='text3' onChange={ (e) => onIntegerChange('height', e) } type='number' min='0' step='5' title='height' />
			<Button title='Delete map' value='&#x1f5d1;' onClick={ deleteMap } />
		</div>
	)
}

export default MapConfigView
