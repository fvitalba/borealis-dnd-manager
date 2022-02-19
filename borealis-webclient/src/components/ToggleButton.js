import Button from '../views/Button'

function ToggleButton({ controlPanelState, setControlPanelState, title, value }) {
    const toggleKey = `toggleOn${title}`
    const onClick = () => {
        setControlPanelState({
            ...controlPanelState,
            toggleOnUser: false,
            toggleOnMaps: false,
            toggleOnTokens: false,
            [toggleKey]: !controlPanelState[toggleKey],
        })
    }
    const isSelected = controlPanelState[toggleKey]
    return (
        <Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
    )
}

export default ToggleButton
