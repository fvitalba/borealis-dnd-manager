import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUsername, setCursorSize } from '../reducers/settingsReducer.js' 
import { pushGameRefresh, requestRefresh, useWebSocket } from '../hooks/useSocket.js'
import ControlPanelView from '../views/ControlPanelView.js'

const initialControlPanelState = () => {
	return {
		hidden: false,
		toggleOnMaps: false,
		toggleOnUser: false,
		toggleOnTokens: false,
	}
}

const ControlPanel = ({ game, settings, metadata, setUsername, setCursorSize }) => {
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)
	const [webSocket, wsSettings] = useWebSocket()

	const toggleHidden = () => {
		setControlPanelState({
			...controlPanelState,
			hidden: !controlPanelState.hidden,
		})
	}

	const updateUsername = (e) => {
		setUsername(e.target.value)
	}

	const updateCursorSize = (e) => {
		const newSize = e.target.value
		if (!isNaN(newSize))
			setCursorSize(newSize)
	}

	const socketRequestRefresh = () => {
		requestRefresh()
	}

	const pushRefreshToPlayers = () => {
		console.log('pushing game', game)
		pushGameRefresh(webSocket, wsSettings.guid, game)
	}

	return (
		<ControlPanelView 
			controlPanelState={ controlPanelState } 
			setControlPanelState={ setControlPanelState } 
			hidden={ controlPanelState.hidden } 
			toggleHidden={ toggleHidden } 
			isHost={ metadata.isHost } 
			username={ settings.username } 
			setUsername={ updateUsername } 
			cursorSize={ settings.cursorSize } 
			setCursorSize={ updateCursorSize } 
			socketRequestRefresh={ socketRequestRefresh } 
			pushRefreshToPlayers={ pushRefreshToPlayers } />
	)
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
		settings: state.settings,
		metadata: state.metadata,
	}
}

const mapDispatchToProps = {
	setUsername,
	setCursorSize,
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
