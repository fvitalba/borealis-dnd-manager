import ToggleButton from '../components/ToggleButton'
import ToolControls from '../components/ToolControls'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import SelectedTokensControls from '../components/SelectedTokensControls'
import ToolSelectView from './ToolSelectView'
import Button from './Button'
// Scarlab Icons
import {
    PlusCircleOutlineIcon,
    /* EyeSolidIcon, */
    UserCircleSolidIcon,
    MapSolidIcon,
    GhostSolidIcon,
    RefreshOutlineIcon
} from './Icons'



const ControlPanelView = ({ controlPanelState, setControlPanelState, hidden, toggleHidden, submenuHidden, fogEnabled, isHost, username, setUsername, cursorSize, setCursorSize, socketRequestRefresh, pushRefreshToPlayers }) => {
    if (hidden)
        return (
            <div id='control-panel' className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <PlusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                </div>
            </div>
        )

    if (isHost)
        return (
            <div id='control-panel' className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <PlusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel'/>
                    <ToggleButton title='User' value={ <UserCircleSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Maps' value={ <MapSolidIcon />} controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Tokens' value={ <GhostSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <Button title='Push refresh to players' value={ <RefreshOutlineIcon /> } onClick={ pushRefreshToPlayers } />
                    <ToolSelectView fogEnabled={ fogEnabled } />
                    <ToolControls />
                </div>
                {
                    !submenuHidden
                        ? <div className='control-panel-submenu'>
                            <MapTool toggleOnMaps={ controlPanelState.toggleOnMaps } />
                            <TokenTool toggleOnTokens={ controlPanelState.toggleOnTokens } />
                            <UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
                        </div>
                        : null
                }
            </div>
        )
    else
        return (
            <div id='control-panel' className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <PlusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                    <input title='User name' placeholder='User name' value={ username } onChange={ (e) => setUsername(e.target.value) } />
                    <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <input title='Cursor size' value={ cursorSize } onChange={ (e) => setCursorSize(parseInt(e.target.value)) } type='number' min='0' />
                    <Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value='&#x1f4ab;' />
                </div>
                {
                    !submenuHidden
                        ? <div className='control-panel-submenu'>
                            <SelectedTokensControls />
                        </div>
                        : null
                }
            </div>
        )
}

export default ControlPanelView
