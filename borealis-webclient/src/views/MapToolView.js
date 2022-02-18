import MapConfig from '../components/MapConfig'
import Button from './Button'

const MapToolView = ({ maps, newMapName, setNewMapName, createMap }) => {
    return (
        <div>
            <hr />
            <div>
                <input placeholder='New map name' onChange={ (e) => setNewMapName(e.target.value) } value={ newMapName } />
                <Button title='Create new map' value='&#x2795;' onClick={ createMap } disabled={ newMapName === '' } />
                { maps.map((map) => (
                    <MapConfig key={ `map${map.$id}` } map={ map } />
                ))}
            </div>
        </div>
    )
}

export default MapToolView
