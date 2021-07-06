import MapConfig from "../components/MapConfig"
import Button from "./button"
import MapConfigView from "./MapConfigView"

const MapToolView = ({ controlPanelState, game, onTextChange, createMap }) => {
	if (!controlPanelState.toggleOnMaps)
		return null
	const maps = game.state.maps
	const keys = maps && Object.keys(maps)
	return (
		<div>
			<hr />
			<div>
			<input placeholder='New map name (optional)' onChange={ onTextChange.bind(this, 'newMapName') } />
			<Button title='Create new map' value='&#x2795;' onClick={ createMap } />
			{keys && keys.map((mapId, $i) => (
				<MapConfig key={ `map${$i}` } mapId={ mapId } map={ maps[mapId] } game={ game } />
			))}
			</div>
		</div>
	)
}

export default MapToolView
