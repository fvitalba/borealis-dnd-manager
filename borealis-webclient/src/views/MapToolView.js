import MapConfig from '../components/MapConfig'
import Button from './Button'
import { ImageAdd } from '@styled-icons/fluentui-system-filled/ImageAdd'

const MapToolView = ({ maps, newMapName, setNewMapName, createMap }) => {
    return (
        <div className='control-panel-submenu'>
            <div>
                <input placeholder='New map name' onChange={ (e) => setNewMapName(e.target.value) } value={ newMapName } className='control-panel-input' />
                <Button title='Create new map' value={ <ImageAdd width='30' /> } onClick={ createMap } disabled={ newMapName === '' } />
                <div className='map-config-collection'>
                    { maps.map((map) => (
                        <MapConfig key={ `map${map.$id}` } map={ map } />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MapToolView
