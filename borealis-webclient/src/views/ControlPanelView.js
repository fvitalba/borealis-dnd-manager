import ToggleButton from '../components/ToggleButton'
import ToolControls from '../components/ToolControls'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import SelectedTokensControls from '../components/SelectedTokensControls'
import ToolSelectView from './ToolSelectView'
import Button from './Button'
import { Show } from '@styled-icons/boxicons-solid/Show'
import { UsersCog } from '@styled-icons/fa-solid/UsersCog'
import { Map } from '@styled-icons/fa-solid/Map'
import { Chess } from '@styled-icons/fa-solid/Chess'
import { RefreshCircle } from '@styled-icons/ionicons-sharp/RefreshCircle'

const ControlPanelView = ({ controlPanelState, setControlPanelState, hidden, toggleHidden, fogEnabled, isHost, username, setUsername, cursorSize, setCursorSize, socketRequestRefresh, pushRefreshToPlayers }) => {
    if (hidden)
        return (
            <div id='control-panel' className='control-panel'>
                <Button value={ <Show width='30' /> } onClick={ toggleHidden } title='show/hide control panel' />
            </div>
        )

    if (isHost)
        return (
            <div id='control-panel' className='control-panel'>
                <Button value={ <Show width='30' /> } onClick={ toggleHidden } title='show/hide control panel'/>
                <span className='tool-group'>
                    <ToggleButton title='User' value={ <UsersCog width='30'/> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Maps' value={ <Map width='30' />} controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Tokens' value={ <Chess width='30' /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <Button title='Push refresh to players' value={ <RefreshCircle width='30' /> } onClick={ pushRefreshToPlayers } />
                </span>
                <ToolSelectView fogEnabled={ fogEnabled } />
                <ToolControls />
                <MapTool toggleOnMaps={ controlPanelState.toggleOnMaps } />
                <TokenTool toggleOnTokens={ controlPanelState.toggleOnTokens } />
                <UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
            </div>
        )
    else
        return (
            <div id='control-panel' className='control-panel'>
                <Button value={ <Show width='30' /> } onClick={ toggleHidden } title='show/hide control panel' />
                <input title='User name' placeholder='User name' value={ username } onChange={ (e) => setUsername(e.target.value) } />
                <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                <input title='Cursor size' value={ cursorSize } onChange={ (e) => setCursorSize(parseInt(e.target.value)) } type='number' min='0' />
                <Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value='&#x1f4ab;' />
                <SelectedTokensControls />
            </div>
        )
}

export default ControlPanelView
