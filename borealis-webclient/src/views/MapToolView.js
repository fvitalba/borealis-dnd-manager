import MapConfig from '../components/MapConfig'
import Button from './Button'
import { PlusSquareSolidIcon } from './Icons'

const MapToolView = ({ maps, newMapName, setNewMapName, createMap }) => {
    return (
        <div className='map-tool-view'>
            <div className='map-tool-creation' >
                <input placeholder='New map name' onChange={ (e) => setNewMapName(e.target.value) } value={ newMapName } className='w-96 control-panel-input' />
                <Button title='Create new map' value={ <PlusSquareSolidIcon /> } onClick={ createMap } disabled={ newMapName === '' } />
            </div>
            {
                maps.length > 0
                    ? <div className='map-config-collection'>
                        { maps.map((map) => (
                            <MapConfig key={ `map${map.$id}` } map={ map } />
                        ))}
                    </div>
                    : null
            }
        </div>
    )
}

export default MapToolView
