import ToolButton from "../components/ToolButton.js"

const ToolSelectView = ({ controlPanel }) => {
	return (
		<span id='tools'>
			<ToolButton title='move' value='&#x1f9f3;' controlPanel={ controlPanel } />
			<ToolButton title='draw' value='&#x1f58d;' controlPanel={ controlPanel } />
			<ToolButton title='fog'  value='&#x1f32c;' controlPanel={ controlPanel } />
		</span>
	)
}

export default ToolSelectView
