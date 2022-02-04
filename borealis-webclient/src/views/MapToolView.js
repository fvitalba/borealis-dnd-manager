import MapConfig from '../components/MapConfig.js'
import Button from './Button.js'

const MapToolView = ({ gameState, setGameState, controlPanelState, onTextChange, createMap }) => {
	if (!controlPanelState.toggleOnMaps)
		return null
	const maps = gameState.state.maps
	const keys = maps && Object.keys(maps)

	return (
		<div>
			<hr />
			<div>
			<input placeholder='New map name (optional)' onChange={ (e) => onTextChange('newMapName', e) } />
			<Button title='Create new map' value='&#x2795;' onClick={ createMap } />
			{ keys && keys.map((mapId, $i) => (
				<MapConfig key={ `map${$i}` } gameState={ gameState } setGameState={ setGameState } map={ maps[mapId] } mapId={ mapId } />
			))}
			</div>
		</div>
	)
}

export default MapToolView
