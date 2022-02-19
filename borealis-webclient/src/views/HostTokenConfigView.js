import Button from './Button'
import { Duplicate } from '@styled-icons/ionicons-sharp/Duplicate'
import { Bot } from '@styled-icons/boxicons-regular/Bot'
import { Smile } from '@styled-icons/boxicons-regular/Smile'
import { CheckSquareFill } from '@styled-icons/bootstrap/CheckSquareFill'
import { CheckboxUnchecked } from '@styled-icons/icomoon/CheckboxUnchecked'
import { Skull } from '@styled-icons/ionicons-solid/Skull'
import { EmojiLaugh } from '@styled-icons/fluentui-system-filled/EmojiLaugh'
import { Delete } from '@styled-icons/fluentui-system-filled/Delete'

const HostTokenConfigView = ({ maps, token, copy, onToggle, selectToken, onTextChange, onIntegerChange, onMapSelect, deleteToken }) => {
    return (
        <div className='token-config'>
            <div className='token-config-header'>
                <input value={ token.name || '' } placeholder='Name' size='8' onChange={ (e) => onTextChange('name', e) } className='control-panel-input-md' />
                <input value={ token.url || '' } placeholder='Url' size='8' onChange={ (e) => onTextChange('url', e) } className='pl-1 control-panel-input-very-long' />
            </div>
            <span className='tool-group'>
                <Button title='Duplicate token' value={ <Duplicate width='30' /> } onClick={ copy } />
                <Button value={ token.pc ? <Smile width='30' className='text-red-300' /> : <Bot width='30' /> } onClick={ (e) => onToggle('pc', e) } title='PC / NPC' />
                <Button value={ token.$selected ? <CheckSquareFill width='30' /> : <CheckboxUnchecked width='30' /> } onClick={ (e) => selectToken(token, e) } title='Toggle selection' />
                <Button value={ token.ko ? <Skull width='30' /> : <EmojiLaugh width='30' /> } onClick={ (e) => onToggle('ko', e) } title='Alive / Dead' />
            </span>
            wh:
            <input value={ token.width || '' } placeholder='w' onChange={ (e) => onIntegerChange('width', e) } type='number' step='5' min='0' title='width' className='control-panel-input-short' />
            <input value={ token.height || '' } placeholder='h' onChange={ (e) => onIntegerChange('height', e) } type='number' step='5' min='0' title='height' className='control-panel-input-short' />
            xy:
            <input value={ token.x || '' } placeholder='x' onChange={ (e) => onIntegerChange('x', e) } type='number' step='5' title='x coord' className='control-panel-input-short' />
            <input value={ token.y || '' } placeholder='y' onChange={ (e) => onIntegerChange('y', e) } type='number' step='5' title='y coord' className='control-panel-input-short' />
            <select defaultValue={ token.mapId } onChange={ (e) => onMapSelect(e) } title='which map'>
                <option key={ -1 } value={ -1 }>(all)</option>
                { maps.map((map) => (
                    <option key={ map.$id } value={ map.name }>{ maps.name }</option>
                ))}
            </select>
            <span className='pl-1 tool-group'>
                <Button title='Delete token' value={ <Delete width='30' /> } onClick={ deleteToken } />
            </span>
        </div>
    )
}

export default HostTokenConfigView
