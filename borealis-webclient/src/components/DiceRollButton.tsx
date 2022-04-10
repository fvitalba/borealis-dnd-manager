import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import { convertChatMessage } from '../utils/commandHandler'
import { addChatMessage } from '../reducers/chatReducer'
import DiceRollButtonView from '../views/DiceRollButtonView'

const DiceRollButton = ({ settings, character, metadata, addChatMessage }) => {
    const [selectorState, setSelectorState] = useState({
        showSelector: false,
        top: 0,
        left: 0,
    })
    const selectorRef = useRef(null)
    const rollDiceButtonRef = useRef(null)
    const [webSocket, wsSettings] = useWebSocket()
    const currentCharacter = character.myCharacterGuid
        ? character.characters.filter((currCharacter) => currCharacter.guid === character.myCharacterGuid)[0]
        : ''

    const getPlayerInfo = () => {
        if (metadata.isHost)
            return 'Dungeon Master'
        else {
            return currentCharacter ? `lvl. ${currentCharacter.level} ${currentCharacter.class}` : ''
        }
    }

    const rollDice = (eyes) => {
        const playerInfo = getPlayerInfo()
        const convertedMessage = convertChatMessage(settings.username, `/roll 1d${eyes}`, currentCharacter)
        if ((convertedMessage.publicMessage.length > 0) || (convertedMessage.privateMessage.length > 0)) {
            const timestamp = Date.now()
            addChatMessage(settings.username, playerInfo, convertedMessage.publicMessage, convertedMessage.privateMessage, convertedMessage.targetPlayerName,
                timestamp, convertedMessage.messageType)
            sendChatMessage(webSocket, wsSettings, settings.username, playerInfo, convertedMessage.publicMessage, convertedMessage.privateMessage,
                convertedMessage.targetPlayerName, timestamp, convertedMessage.messageType)
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

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        metadata: state.metadata,
        character: state.character,
    }
}

const mapDispatchToProps = {
    addChatMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceRollButton)
