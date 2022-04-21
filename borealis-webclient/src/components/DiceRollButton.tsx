import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import Character from '../classes/Character'
import Message from '../classes/Message'
import DiceType, { DiceTypeType } from '../enums/DiceType'
import MessageType from '../enums/MessageType'
import UserType from '../enums/UserType'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { addChatMessage } from '../reducers/chatReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { CharacterState } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { convertChatMessage } from '../utils/commandHandler'
import DiceRollButtonView from '../views/DiceRollButtonView'

interface DiceRollButtonProps {
    settingsState: SettingsState,
    characterState: CharacterState,
    metadataState: MetadataState,
    addChatMessage: (arg0: Message) => void,
}

const DiceRollButton = ({ settingsState, characterState, metadataState, addChatMessage }: DiceRollButtonProps) => {
    const [selectorState, setSelectorState] = useState({
        showSelector: false,
        top: 0,
        left: 0,
    })
    const selectorRef = useRef<HTMLDivElement>(null)
    const rollDiceButtonRef = useRef<HTMLButtonElement>(null)
    const webSocketContext = useWebSocket()
    const currentCharacter = characterState.currentCharacterGuid
        ? characterState.characters.filter((currCharacter) => currCharacter.guid === characterState.currentCharacterGuid)[0]
        : new Character('', '', 0)

    const getPlayerInfo = () => {
        if (metadataState.userType === UserType.host)
            return 'Dungeon Master'
        else {
            return currentCharacter ? currentCharacter.getCharacterClassInfo() : ''
        }
    }

    const rollDice = (diceType: DiceTypeType) => {
        const diceTypeEnum = DiceType[diceType]
        const playerInfo = getPlayerInfo()
        const convertedMessage = convertChatMessage(settingsState.username, `/roll 1d${diceTypeEnum}`, currentCharacter, playerInfo)
        if ((convertedMessage.publicMessage.length > 0) || (convertedMessage.privateMessage.length > 0)) {
            addChatMessage(convertedMessage)
            if (webSocketContext.ws && webSocketContext.wsSettings && (convertedMessage.type !== MessageType.Error ))
                sendChatMessage(webSocketContext.ws, webSocketContext.wsSettings, convertedMessage)
        }
    }

    const toggleSelector = () => {
        setSelectorState({
            ...selectorState,
            showSelector: !selectorState.showSelector
        })
    }

    const selectorPosition = {
        top: selectorState.top,
        left: selectorState.left,
    }

    useEffect(() => {
        if (selectorState.showSelector) {
            if (selectorRef.current && rollDiceButtonRef.current) {
                setSelectorState({
                    ...selectorState,
                    top: -selectorRef.current.offsetHeight,
                    left: 4,
                })
            }
        }
    }, [ selectorState.showSelector ])

    return (
        <DiceRollButtonView
            rollDice={ rollDice }
            selectorPosition={ selectorPosition }
            showSelector={ selectorState.showSelector }
            toggleSelector={ toggleSelector }
            selectorRef={ selectorRef }
            rollDiceButtonRef={ rollDiceButtonRef }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        settingsState: state.settings,
        metadataState: state.metadata,
        characterState: state.character,
    }
}

const mapDispatchToProps = {
    addChatMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceRollButton)
