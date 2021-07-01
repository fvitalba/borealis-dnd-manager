import Button from './button'

const MapConfigView = ({ isSelected, map, mapId, load, onTextChange, resize, deleteMap }) => {
	//TODO: Review after refactoring
	return (
		<div className={ isSelected ? 'selected' : null }>
			{ mapId }
			<input value={ map.name || '' } placeholder='Map name' size='8' onChange={ onTextChange.bind(this, 'name') } />
			<input value={ map.url || '' } placeholder='Map url' size='8' onChange={ onTextChange.bind(this, 'url') } />
			<Button title='Load map' value='&#x1f23a;' onClick={ load.bind(this) } />
			wh:
			<input value={ map.w || '' } placeholder='w' className='text3' onChange={ resize.bind(this, 'w') } type='number' min='0' step='5' title='width' />
			<input value={ map.h || '' } placeholder='h' className='text3' onChange={ resize.bind(this, 'h') } type='number' min='0' step='5' title='height' />
			<Button title='Delete map' value='&#x1f5d1;' onClick={ deleteMap.bind(this) } />
		</div>
	)
}

export default MapConfigView
