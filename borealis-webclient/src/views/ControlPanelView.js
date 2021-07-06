import Button from "./Button.js"
import ToggleButton from "../components/ToggleButton.js"
import ToolSelectView from "./ToolSelectView.js"
import ToolControlsView from "./ToolControlView.js"
import MapToolView from "./MapToolView.js"
import TokenToolView from "./TokenToolView.js"
import UserToolView from "./UserToolView.js"
import SelectedTokensControlsView from "./SelectedTokensControlsView.js"

const ControlPanelView = ({ game, controlPanel, hidden, toggleHidden, setGameInt, setGameText, socketRequestRefresh }) => {
	//TODO: Pass parameters to custom Controls
	if (hidden)
		return (
			<div id='control-panel'>
				<Button value='&#x1f441;' onClick={ toggleHidden.bind(this) } title='show/hide control panel' />
			</div>
		)
	
	if (game.isHost)
		return (
			<div id='control-panel'>
				<Button value='&#x1f441;' onClick={ toggleHidden.bind(this) } title='show/hide control panel' />
				|||
				<ToggleButton title='User' value='&#x1f9d9;&#x200d;&#x2642;&#xfe0f;' controlPanel={ controlPanel } />
				<ToggleButton title='Maps' value='&#x1f5fa;' controlPanel={ controlPanel } />
				<ToggleButton title='Tokens' value='&#x265f;' controlPanel={ controlPanel } />
				<Button title='Push refresh to players' value='&#x1f4ab;' onClick={ game.websocket.pushRefresh.bind(game.websocket, {}) } />
				|||
				{/* this.renderToolSelect() */}
				<ToolSelectView />
				|||
				{/*this.renderToolControls()*/}
				<ToolControlsView />
				{/*this.renderMaps()*/}
				<MapToolView />
				{/*this.renderTokens()*/}
				<TokenToolView />
				{/*this.renderUser()*/}
				<UserToolView />
			</div>
		)
	else
		return (
			<div id='control-panel'>
			<Button value='&#x1f441;' onClick={ toggleHidden.bind(this) } title='show/hide control panel' />
			<input title='User name' placeholder='User name' value={ game.state.username || '' } onChange={ setGameText.bind(this, 'username') } />
			<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanel={ game } />
			<input title='Cursor size' value={ game.state.cursorSize || '' } onChange={ setGameInt.bind(this, 'cursorSize') } type='number' min='0' />
			<Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh.bind(this) } value='&#x1f4ab;' />
			{/* this.renderSelectedTokensControls() */}
			<SelectedTokensControlsView />
			</div>
		)
}

export default ControlPanelView
