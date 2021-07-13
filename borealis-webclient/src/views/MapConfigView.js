import Button from './Button.js'

const MapConfigView = ({ isSelected, mapConfigState, mapId, load, onTextChange, onIntegerChange, deleteMap }) => {
	return (
		<div className={ isSelected ? 'selected' : null }>
			{ mapId }
			<input value={ mapConfigState.name || '' } placeholder='Map name' size='8' onChange={ (e) => onTextChange('name', e) } />
			<input value={ mapConfigState.imageUrl || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('imageUrl', e) } />
			w:
			<input value={ mapConfigState.width || 0 } placeholder='width' className='text3' onChange={ (e) => onIntegerChange('width', e) } type='number' min='0' step='10' title='width' />
			h:
			<input value={ mapConfigState.height || 0 } placeholder='height' className='text3' onChange={ (e) => onIntegerChange('height', e) } type='number' min='0' step='10' title='height' />
			<Button title='Save & load map' value='&#x1f4c0;' onClick={ load } />
			<Button title='Delete map' value='&#x1f5d1;' onClick={ deleteMap } />
		</div>
	)
}

export default MapConfigView
