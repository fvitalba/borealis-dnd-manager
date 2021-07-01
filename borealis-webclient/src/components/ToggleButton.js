import Button from '../views/button.js'

function ToggleButton({ cp, title, value }) {
    //TODO: To review post Refactoring
	const toggleKey = `toggleOn${title}`
	const onClick = () => {
		cp.setState({
			[toggleKey]: !cp.state[toggleKey]
		})
	}
	const isSelected = cp.state[toggleKey]
	return (
		<Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToggleButton
