import React, { ReactElement } from 'react'
import { ControlPanelState } from './ControlPanel'
import Button from '../views/Button'

// type TogglePropertyName = 'hidden' | 'toggleOnMaps' | 'toggleOnTokens' | 'toggleOnCharacterStats' | 'toggleOnCharacterInventory' | 'toggleOnCharacterSpells'

interface ToggleButtonProps {
    propertyName: string,
    title: string,
    value: ReactElement,
    controlPanelState: ControlPanelState,
    setControlPanelState: (arg0: ControlPanelState) => void,
}

const ToggleButton = ({ propertyName, title, value, controlPanelState, setControlPanelState }: ToggleButtonProps) => {
    const toggleKey = propertyName ? `toggleOn${propertyName}`: `toggleOn${title}`
    const onClick = () => {
        //TODO: To enable the controlPanelState[toggleKey] we need to promise, that our string will only be one, that is an actual property.
        // we have currently solved this, by telling the ControlPanelState, that we actually accept any key as a property
        // however a cleaner solution would be, to implement a type containing all allowed strings
        // and then only allowing propertyName to be a string within that collection of allowed strings
        //TODO: check where the ToggleButton is used and verify that it's only used in conjunction with the control panel state
        // if this is not the case, verify how we can selectively update the control panel state
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
