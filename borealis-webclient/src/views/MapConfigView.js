import Button from './Button.js'

const MapConfigView = ({ isSelected, map, mapId, load, onTextChange, resize, deleteMap }) => {
	//TODO: Review after refactoring
	return (
		<div className={ isSelected ? 'selected' : null }>
			{ mapId }
			<input value={ map.name || '' } placeholder='Map name' size='8' onChange={ (e) => onTextChange('name', e) } />
			<input value={ map.url || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('url', e) } />
			<Button title='Load map' value='&#x1f23a;' onClick={ load() } />
			wh:
			<input value={ map.w || '' } placeholder='w' className='text3' onChange={ (e) => resize('w', e) } type='number' min='0' step='5' title='width' />
			<input value={ map.h || '' } placeholder='h' className='text3' onChange={ (e) => resize('h', e) } type='number' min='0' step='5' title='height' />
			<Button title='Delete map' value='&#x1f5d1;' onClick={ deleteMap() } />
		</div>
	)
}

export default MapConfigView
