import { connect } from 'react-redux'
import { loadDefaultBattleGame, setFogEnabled } from '../reducers/gameReducer.js'
import { setUsername, setCursorSize, setToolSettings } from '../reducers/settingsReducer.js'
import { pushFogEnabled, useWebSocket } from '../hooks/useSocket.js'
import UserToolView from '../views/UserToolView.js'

const UserTool = ({ toggleOnUser, game, settings, setFogEnabled, setUsername, setCursorSize, setToolSettings, loadDefaultBattleGame }) => {
    const [webSocket, wsSettings, setWsSettings] = useWebSocket()
	if (!toggleOnUser)
		return null

    const updateUsername = (value) => {
        setUsername(value)
        setWsSettings({
			...wsSettings,
			username: value,
		})
    }

    const updateCursorSize = (value) => {
        const newSize = value
		if (!isNaN(newSize))
			setCursorSize(newSize)
    }

    const initAsDev = () => {
		const mapsExist = game.maps.length > 0
		const tokensExist = game.tokens.length > 0
		if ((mapsExist && tokensExist) && !window.confirm('Overwrite game with defaults?'))
			return
        loadDefaultBattleGame()
    }

    const toggleFog = () => {
        setFogEnabled(!game.fogEnabled)
        pushFogEnabled(webSocket, wsSettings, !game.fogEnabled)
        if (settings.tool === 'fog')
            setToolSettings('move','')
    }

    const copyJson = () => {
		//TODO: Implement CopyJson
		/*
		const json = gameState.toJson()
		window.navigator.clipboard.writeText(json).then(() => {
			notify('copied to clipboard')
		}).catch(err => {
			console.error('failed to write to clipboard: ', err)
			notify(`failed to write to clipboard: ${err}`, 2000)
		})
		*/
	}

	const pasteJson = () => {
		//TODO: Implement PasteJson
		/*
		const note1 = notify('reading clipboard...')
		window.navigator.clipboard.readText().then(json => {
			if (window.confirm(`Do you really want to overwrite this game with what's in your clipboard? ${json.slice(0,99)}...`)) {
				fromJson(json)
				notify('pasted from clipboard')
			}
			note1 && note1.close()
		}).catch(err => {
			console.error('failed to read clipboard: ', err)
			notify(`failed to read clipboard: ${err}`, 2000)
		})
		*/
	}

	return (
        toggleOnUser ?
		    <UserToolView
                initAsDev={ initAsDev } 
                toggleFog={ toggleFog } 
                copyJson={ copyJson } 
                pasteJson={ pasteJson } 
                username={ settings.username } 
                updateUsername={ updateUsername } 
                cursorSize={ settings.cursorSize } 
                updateCursorSize={ updateCursorSize } />
            : null
	)
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
        settings: state.settings,
	}
}

const mapDispatchToProps = {
    setUsername,
	setCursorSize,
    setFogEnabled,
    setToolSettings,
    loadDefaultBattleGame,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
