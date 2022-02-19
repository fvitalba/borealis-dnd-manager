import Button from './Button'
import { Upload } from '@styled-icons/icomoon/Upload'
import { Delete } from '@styled-icons/fluentui-system-filled/Delete'

const MapConfigView = ({ isSelected, mapConfigState, load, onTextChange, onIntegerChange, deleteMap }) => {
    return (
        <div className={ isSelected ? 'map-config-selected' : 'map-config' }>
            <div>{ mapConfigState.name }</div>
            <input value={ mapConfigState.imageUrl || '' } placeholder='Map url' size='8' onChange={ (e) => onTextChange('imageUrl', e) } className='control-panel-input-very-long' />
            <span>w:</span>
            <input value={ mapConfigState.width || 0 } placeholder='width' onChange={ (e) => onIntegerChange('width', e) } type='number' min='0' step='10' title='width' className='control-panel-input-short' />
            <span>h:</span>
            <input value={ mapConfigState.height || 0 } placeholder='height' onChange={ (e) => onIntegerChange('height', e) } type='number' min='0' step='10' title='height' className='control-panel-input-short' />
            <span className='tool-group'>
                <Button title='Save & load map' value={ <Upload width='30' /> } onClick={ load } />
                <Button title='Delete map' value={ <Delete width='30' /> } onClick={ deleteMap } />
            </span>
        </div>
    )
}

export default MapConfigView
