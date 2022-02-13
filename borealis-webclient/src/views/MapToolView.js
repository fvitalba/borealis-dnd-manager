import MapConfig from '../components/MapConfig.js'
import Button from './Button.js'

const MapToolView = ({ maps, newMapName, setNewMapName, createMap, websocket }) => {
	return (
		<div>
			<hr />
			<div>
			<input placeholder='New map name' onChange={ (e) => setNewMapName(e.target.value) } value={ newMapName } />
			<Button title='Create new map' value='&#x2795;' onClick={ createMap } disabled={ newMapName === '' } />
			{ maps.map((map) => (
				<MapConfig key={ `map${map.$id}` } map={ map } websocket={ websocket } />
			))}
			</div>
		</div>
	)
}

export default MapToolView
