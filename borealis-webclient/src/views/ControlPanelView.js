import ToggleButton from '../components/ToggleButton.js'
import ToolControls from '../components/ToolControls.js'
import MapTool from '../components/MapTool.js'
import TokenTool from '../components/TokenTool.js'
import UserTool from '../components/UserTool.js'
import SelectedTokensControls from '../components/SelectedTokensControls.js'
import ToolSelectView from './ToolSelectView.js'
import Button from './Button.js'

const ControlPanelView = ({ controlPanelState, setControlPanelState, hidden, toggleHidden, isHost, username, setUsername, cursorSize, setCursorSize, socketRequestRefresh, pushRefreshToPlayers }) => {
	if (hidden)
		return (
			<div id='control-panel'>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
		)
	
	if (isHost)
		return (
			<div id='control-panel'>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToggleButton title='User' value='&#x1f9d9;&#x200d;&#x2642;&#xfe0f;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
				<ToggleButton title='Maps' value='&#x1f5fa;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
				<ToggleButton title='Tokens' value='&#x265f;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
				<Button title='Push refresh to players' value='&#x1f4ab;' onClick={ pushRefreshToPlayers } />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToolSelectView />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToolControls />
				<MapTool toggleOnMaps={ controlPanelState.toggleOnMaps } />
				<TokenTool toggleOnTokens={ controlPanelState.toggleOnTokens } />
				<UserTool toggleOnUser={ controlPanelState.toggleOnUser } />
			</div>
		)
	else
		return (
			<div id='control-panel'>
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				<input title='User name' placeholder='User name' value={ username } onChange={ (e) => setUsername(e.target.value) } />
				<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanelState={ controlPanelState } setControlPanelState={ setControlPanelState } />
				<input title='Cursor size' value={ cursorSize } onChange={ (e) => setCursorSize(parseInt(e.target.value)) } type='number' min='0' />
				<Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value='&#x1f4ab;' />
				<SelectedTokensControls />
			</div>
		)
}

export default ControlPanelView
