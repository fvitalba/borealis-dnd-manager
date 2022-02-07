import MapConfig from '../components/MapConfig.js'
import Button from './Button.js'

const MapToolView = ({ gameState, setGameState, controlPanelState, onTextChange, createMap, websocket }) => {
	if (!controlPanelState.toggleOnMaps)
		return null
	const maps = gameState.game.maps
	const keys = maps && Object.keys(maps)

	return (
		<div>
			<hr />
			<div>
			<input placeholder='New map name' onChange={ (e) => onTextChange('newMapName', e) } value={ controlPanelState.newMapName } />
			<Button title='Create new map' value='&#x2795;' onClick={ createMap } disabled={ !controlPanelState.newMapName || (controlPanelState.newMapName === '') } />
			{ keys && keys.map((mapId, $i) => (
				<MapConfig key={ `map${$i}` } gameState={ gameState } setGameState={ setGameState } map={ maps[mapId] } mapId={ mapId } websocket={ websocket } />
			))}
			</div>
		</div>
	)
}

export default MapToolView
