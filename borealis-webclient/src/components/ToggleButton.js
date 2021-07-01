import Button from '../views/button.js'

function ToggleButton({ controlPanel, title, value }) {
    //TODO: To review post Refactoring
	const toggleKey = `toggleOn${title}`
	const onClick = () => {
		controlPanel.setState({
			[toggleKey]: !controlPanel.state[toggleKey]
		})
	}
	const isSelected = controlPanel.state[toggleKey]
	return (
		<Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToggleButton
