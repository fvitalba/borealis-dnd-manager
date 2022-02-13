import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUsername, setCursorSize } from '../reducers/settingsReducer.js' 
import ControlPanelView from '../views/ControlPanelView.js'

const initialControlPanelState = () => {
	return {
		hidden: false,
		toggleOnMaps: false,
		toggleOnUser: false,
		toggleOnTokens: false,
	}
}

const ControlPanel = ({ websocket, game, settings, metadata, setUsername, setCursorSize }) => {
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)

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
		websocket.requestRefresh()
	}

	const pushRefreshToPlayers = () => {
		websocket.pushRefresh(game)
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
			websocket={ websocket } 
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
