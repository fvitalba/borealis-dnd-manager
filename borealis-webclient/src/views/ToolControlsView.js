import Button from './Button.js'

const ToolControlsView = ({ tool, subtool, drawColor, setDrawColor, drawSize, setDrawSize, fogOpacity, setFogOpacity, fogRadius, setFogRadius, setSubtool, resetFog, resetDrawing }) => {
	switch (tool) {
		case 'draw':
			return (
				<span>
					<Button title='eraser' value='&#x1f9fd;' onClick={ () => setSubtool('eraser') } isSelected={ subtool === 'eraser' } />
					<Button title='pencil' value='&#x1f58d;' onClick={ () => setSubtool('pencil') } isSelected={ subtool === 'pencil' } />
					<input size='3' title='draw size' value={ drawSize } onChange={ (e) => setDrawSize(e.target.value) } type='number' step='3' min='1' />
					<input size='3' title='draw color' value={ drawColor } onChange={ (e) => setDrawColor(e.target.value) } />
					<Button style={{ backgroundColor: drawColor }} value='&#x1f58c;' disabled />
					<Button title='reset drawing' onClick={ resetDrawing } value='&#x1f300;' />
				</span>
			)
		case 'move':
			return null
		case 'fog':
			return (
				<span>
					<Button title='reset fog' onClick={ resetFog } value='&#x1f300;' />
					<input size='3' title='fog radius' value={ fogRadius } onChange={ (e) => setFogRadius(e.target.value) } type='number' step='5' min='1' />
					<input size='3' title='fog opacity' step='0.05' min='0' max='1' value={ fogOpacity } onChange={ (e) => setFogOpacity(e.target.value) } type='number' />
				</span>
			)
		default:
			return null
	}
}

export default ToolControlsView
