import Button from './Button.js'
import ToggleButton from '../components/ToggleButton.js'
import ToolSelectView from './ToolSelectView.js'
import ToolControlsView from './ToolControlsView.js'
import MapToolView from './MapToolView.js'
import TokenToolView from './TokenToolView.js'
import UserToolView from './UserToolView.js'
import SelectedTokensControlsView from './SelectedTokensControlsView.js'

const ControlPanelView = ({ gameState, setGameState, controlPanelState, websocket, token, hidden, toggleHidden, setGameInt, setGameText, socketRequestRefresh, initAsDev, toggleOnUser, copyJson, pasteJson, resetFog, onTextChange, createMap, loadMap, updateGameToken, selectGameToken, newTokenUrl, createToken }) => {
	if (hidden)
		return (
			<div id='control-panel'>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
		)
	
	if (gameState.isHost)
		return (
			<div id='control-panel'>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToggleButton title='User' value='&#x1f9d9;&#x200d;&#x2642;&#xfe0f;' gameState={ gameState } setGameState={ setGameState } />
				<ToggleButton title='Maps' value='&#x1f5fa;' gameState={ gameState } setGameState={ setGameState } />
				<ToggleButton title='Tokens' value='&#x265f;' gameState={ gameState } setGameState={ setGameState } />
				{/* TODO: Verify how this is called correctly */}
				<Button title='Push refresh to players' value='&#x1f4ab;' onClick={ websocket.pushRefresh(gameState, {}) } />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToolSelectView 
					gameState={ gameState } 
					setGameState={ setGameState } />
				&nbsp;&nbsp;&nbsp;&nbsp;
				<ToolControlsView 
					gameState={ gameState } 
					setGameState={ setGameState } 
					resetFog={ resetFog } />
				<MapToolView 
					gameState={ gameState }
					setGameState={ setGameState } 
					controlPanelState={ controlPanelState } 
					onTextChange={ onTextChange } 
					createMap={ createMap } 
					loadMap={ loadMap } />
				<TokenToolView 
					gameState={ gameState }
					setGameState={ setGameState } 
					onTextChange={ onTextChange } 
					newTokenUrl={ newTokenUrl } 
					createToken={ createToken } 
					updateGameToken={ updateGameToken } 
					selectGameToken={ selectGameToken } />
				<UserToolView 
					gameState={ gameState }
					setGameState={ setGameState }
					initAsDev={ initAsDev }
					toggleOnUser={ toggleOnUser }
					copyJson={ copyJson } 
					pasteJson={ pasteJson } 
					setGameInt={ setGameInt } 
					setGameText={ setGameText } />
			</div>
		)
	else
		return (
			<div id='control-panel'>
				<Button value='&#x1f441;' onClick={ toggleHidden } title='show/hide control panel' />
				<input title='User name' placeholder='User name' value={ gameState.state.username || '' } onChange={ (e) => setGameText('username', e) } />
				<ToggleButton title='Share mouse (cursor)' value='&#x1f401;' gameState={ gameState } setGameState={ setGameState } />
				<input title='Cursor size' value={ gameState.state.cursorSize || '' } onChange={ (e) => setGameInt('cursorSize', e) } type='number' min='0' />
				<Button title='Request gameboard refresh from host' onClick={ socketRequestRefresh } value='&#x1f4ab;' />
				<SelectedTokensControlsView 
					gameState={ gameState }
					setGameState={ setGameState } 
					updateGameToken={ updateGameToken } 
					selectGameToken={ selectGameToken } />
			</div>
		)
}

export default ControlPanelView
