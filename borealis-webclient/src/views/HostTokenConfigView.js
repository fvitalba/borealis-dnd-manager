import Button from './Button'

const HostTokenConfigView = ({ maps, token, copy, onToggle, selectToken, onTextChange, onIntegerChange, onMapSelect, deleteToken }) => {
    return (
        <div className='tokenConfig'>
            <Button title='Duplicate token' value='&#x1f46f;' onClick={ copy } />
            <Button value={ token.pc ? '\u{1f5a5}' : '\u{1f464}' } onClick={ (e) => onToggle('pc', e) } title='pc/npc' />
            <Button value={ token.$selected ? '\u{2705}' : '\u{274C}' } onClick={ (e) => selectToken(token, e) } title='(un)select' />
            <Button value={ token.ko ? '\u{1f940}' : '\u{1f339}' } onClick={ (e) => onToggle('ko', e) } title='alive/dead' />
            <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className='control-panel-input' />
            <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className='control-panel-input' />
            wh:
            <input value={ token.width || '' } placeholder='w' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' className='control-panel-input' />
            <input value={ token.height || '' } placeholder='h' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' className='control-panel-input' />
            xy:
            <input value={ token.x || '' } placeholder='x' onChange={ (e) => onIntegerChange('x', e) } type='number' step='5' title='x coord' className='control-panel-input' />
            <input value={ token.y || '' } placeholder='y' onChange={ (e) => onIntegerChange('y', e) } type='number' step='5' title='y coord' className='control-panel-input' />
            <select defaultValue={ token.mapId } onChange={ (e) => onMapSelect(e) } title='which map'>
                <option key={ -1 } value={ -1 }>(all)</option>
                { maps.map((map) => (
                    <option key={ map.$id } value={ map.name }>{ maps.name }</option>
                ))}
            </select>
            <Button title='Delete token' value='&#x1f5d1;' onClick={ deleteToken } />
        </div>
    )
}

export default HostTokenConfigView
