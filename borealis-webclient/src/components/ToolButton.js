import Button from '../views/Button.js'
import { connect, useDispatch } from 'react-redux'
import { setToolSettings } from '../reducers/settingsReducer.js'

function ToolButton({ title, value, settings, setToolSettings }) {
	const dispatch = useDispatch()
	const isSelected = title === settings.tool
	const onClick = () => {
		dispatch(setToolSettings(title, undefined))
	}
	return (
		<Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
	)
}

const mapStateToProps = (state) => {
	return {
		settings: state.settings,
	}
}

const mapDispatchToProps = {
	setToolSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButton)
