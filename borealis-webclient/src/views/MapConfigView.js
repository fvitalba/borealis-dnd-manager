import Button from './Button'
import { CheckSquareOutlineIcon, SquareOutlineIcon, DocumentXOutlineIcon } from './Icons'

const MapConfigView = ({ isSelected, mapConfigState, load, onTextChange, onIntegerChange, deleteMap }) => {
    return (
        <div className={ isSelected ? 'map-config-selected' : 'map-config' }>
            <div className='map-config-map-info' >
                <div className={ isSelected ? 'map-config-map-name-selected' : 'map-config-map-name' } >
                    { mapConfigState.name }
                </div>
                <div className='map-config-map-details' >
                    <input value={ mapConfigState.imageUrl || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('imageUrl', e) } className='control-panel-input-very-long' />
                    <span>w:</span>
                    <input value={ mapConfigState.width || 0 } placeholder='width' onChange={ (e) => onIntegerChange('width', e) } type='number' min='0' step='10' title='width' className='pl-1 control-panel-input-short' />
                    <span>h:</span>
                    <input value={ mapConfigState.height || 0 } placeholder='height' onChange={ (e) => onIntegerChange('height', e) } type='number' min='0' step='10' title='height' className='pl-1 control-panel-input-short' />
                </div>
            </div>
            <div className='map-config-map-actions'>
                <Button title='Save & load map' value={ isSelected ? <CheckSquareOutlineIcon /> : <SquareOutlineIcon /> } onClick={ load } />
                <Button title='Delete map' value={ <DocumentXOutlineIcon /> } onClick={ deleteMap } />
            </div>
        </div>
    )
}

export default MapConfigView
