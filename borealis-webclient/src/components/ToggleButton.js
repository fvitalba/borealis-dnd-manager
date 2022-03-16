import Button from '../views/Button'

const ToggleButton = ({ propertyName, controlPanelState, setControlPanelState, title, value }) => {
    const toggleKey = propertyName ? `toggleOn${propertyName}`: `toggleOn${title}`
    const onClick = () => {
        setControlPanelState({
            ...controlPanelState,
            toggleOnUser: false,
            toggleOnMaps: false,
            toggleOnTokens: false,
            toggleOnCharacterStats: false,
            toggleOnCharacterInventory: false,
            toggleOnCharacterSpells: false,
            [toggleKey]: !controlPanelState[toggleKey],
        })
    }
    const isSelected = controlPanelState[toggleKey]
    return (
        <Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
    )
}

export default ToggleButton
