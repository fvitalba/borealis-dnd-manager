import ToggleButton from '../components/ToggleButton'
import ToolControls from '../components/ToolControls'
import MapTool from '../components/MapTool'
import TokenTool from '../components/TokenTool'
import UserTool from '../components/UserTool'
import SelectedTokensControls from '../components/SelectedTokensControls'
import ToolSelectView from './ToolSelectView'
import Button from './Button'
import { PlusCircleOutlineIcon, MinusCircleOutlineIcon, UserCircleSolidIcon, MapSolidIcon, GhostSolidIcon, RefreshOutlineIcon, CursorOutlineIcon, CursorSolidIcon } from './Icons'



const ControlPanelView = ({ controlPanelState, setControlPanelState, hidden, toggleHidden, submenuHidden, fogEnabled, isHost, username, setUsername, mouseIsShared, toggleShareMouse, socketRequestRefresh, pushRefreshToPlayers }) => {
    if (hidden)
        return (
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <PlusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                </div>
            </div>
        )

    if (isHost)
        return (
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <MinusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel'/>
                    <ToggleButton title='User' value={ <UserCircleSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Maps' value={ <MapSolidIcon />} controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <ToggleButton title='Tokens' value={ <GhostSolidIcon /> } controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
                    <Button title='Push refresh to players' value={ <RefreshOutlineIcon /> } onClick={ pushRefreshToPlayers } />
                    <ToolSelectView isHost={ isHost } fogEnabled={ fogEnabled } />
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
            <div className='control-panel-container'>
                <div className='control-panel-tools'>
                    <Button value={ <MinusCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide control panel' />
                    <input title='User name' placeholder='User name' value={ username } onChange={ (e) => setUsername(e.target.value) } className='control-panel-input' />
                    <Button title={ mouseIsShared ? 'Cursor shared' : 'Cursor hidden' } value={ mouseIsShared ? <CursorSolidIcon /> : <CursorOutlineIcon /> } onClick={ toggleShareMouse } />
                    <Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value={ <RefreshOutlineIcon /> } />
                    <ToolSelectView isHost={ isHost } fogEnabled={ fogEnabled } />
                    <ToolControls />
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
