import MapConfig from "../components/MapConfig.js"
import Button from "./Button.js"

const MapToolView = ({ controlPanelState, game, onTextChange, createMap }) => {
	if (!controlPanelState.toggleOnMaps)
		return null
	const maps = game.state.maps
	const keys = maps && Object.keys(maps)
	return (
		<div>
			<hr />
			<div>
			<input placeholder='New map name (optional)' onChange={ (e) => onTextChange('newMapName', e) } />
			<Button title='Create new map' value='&#x2795;' onClick={ createMap } />
			{keys && keys.map((mapId, $i) => (
				<MapConfig key={ `map${$i}` } mapId={ mapId } map={ maps[mapId] } game={ game } />
			))}
			</div>
		</div>
	)
}

export default MapToolView
