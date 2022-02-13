import { connect, useDispatch } from 'react-redux'
import { setToolSettings, setDrawToolSettings, setFogToolSettings } from '../reducers/settingsReducer.js'
import { resetFog, resetDraw } from '../reducers/gameReducer.js'
import ToolControlsView from "../views/ToolControlsView.js"

const ToolControls = ({ settings, setToolSettings, setFogToolSettings, resetFog, resetDraw }) => {
	const dispatch = useDispatch()
	const setSubtool = (subtool) => {
		setToolSettings(settings.tool, subtool)
	}

	const setDrawColor = (e) => {
		dispatch(setDrawToolSettings(e.target.value, settings.drawSize))
	}

	const setDrawSize = (e) => {
		const newSize = e.target.value
		if (!isNaN(newSize))
			dispatch(setDrawToolSettings(settings.drawColor, newSize))
	}

	const setFogOpacity = (e) => {
		const newOpacity = e.target.value
		if (!isNaN(newOpacity))
			dispatch(setFogToolSettings(newOpacity, settings.fogRadius))
	}

	const setFogRadius = (e) => {
		const newRadius = e.target.value
		if (!isNaN(newRadius))
			dispatch(setFogToolSettings(settings.fogOpacity, newRadius))
	}

	const resetFogOnCurrentMap = () => {
		dispatch(resetFog())
	}

	const resetDrawOnCurrentMap = () => {
		dispatch(resetDraw())
	}

	return (
		<span>
			<ToolControlsView 
				tool={ settings.tool } 
				subtool={ settings.subtool } 
				drawColor={ settings.drawColor } 
				setDrawColor={ setDrawColor } 
				drawSize={ settings.drawSize } 
				setDrawSize={ setDrawSize } 
				fogOpacity={ settings.fogOpacity } 
				setFogOpacity={ setFogOpacity } 
				fogRadius={ settings.fogRadius } 
				setFogRadius={ setFogRadius } 
				setSubtool={ setSubtool } 
				resetFog={ resetFogOnCurrentMap } 
				resetDrawing={ resetDrawOnCurrentMap } />
		</span>
	)
}

const mapStateToProps = (state) => {
	return {
		settings: state.settings,
	}
}

const mapDispatchToProps = {
	setToolSettings,
	setDrawToolSettings,
	setFogToolSettings,
	resetFog,
	resetDraw,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolControls)
