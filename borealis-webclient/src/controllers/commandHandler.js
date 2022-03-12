const COMMAND_NOT_VALID_ERR = 'Command is not valid.'
const commandNotValidMessage = {
    messageType: 'error',
    privateMessage: COMMAND_NOT_VALID_ERR,
    publicMessage: COMMAND_NOT_VALID_ERR,
}

export const convertChatMessage = (playerName, inputChatMessage) => {
    const splitMessage = inputChatMessage.split(' ')
    let returnMessage

    switch (splitMessage[0].toUpperCase()) {
    case '/R':
    case '/ROLL':
        if (splitMessage.length < 2)
            return commandNotValidMessage

        return rollDiceCommand(playerName, splitMessage[1].toUpperCase())
    case '/HR':
    case'/HIDDENROLL':
        if (splitMessage.length < 2)
            return commandNotValidMessage

        return rollHiddenDiceCommand(playerName, splitMessage[1].toUpperCase())
    case '/W':
    case '/WHISPER':
        return commandNotValidMessage
    default:
        returnMessage = {
            messageType: 'message',
            publicMessage: inputChatMessage,
            privateMessage: inputChatMessage,
        }
        return returnMessage
    }
}

const rollDiceCommand = (playerName, diceText) => {
    const splitDiceText = diceText.split('D')
    if (splitDiceText.length !== 2)
        return commandNotValidMessage

    const noOfDice = parseInt(splitDiceText[0])
    const diceType = parseInt(splitDiceText[1])
    let rolledValues = []
    for (let i = 0; i < noOfDice; i++) {
        rolledValues.push(rollDice(diceType))
    }
    const totalValue = rolledValues.reduce((a, b) => a + b, 0)
    const convertedMessage = `${playerName} rolled the following values ${rolledValues}, for a total of: ${totalValue}.`
    const returnMessage = {
        messageType: 'command',
        publicMessage: convertedMessage,
        privateMessage: convertedMessage,
    }
    return returnMessage
}

const rollHiddenDiceCommand = (playerName, diceText) => {
    const splitDiceText = diceText.split('D')
    if (splitDiceText.length !== 2)
        return commandNotValidMessage

    const noOfDice = parseInt(splitDiceText[0])
    const diceType = parseInt(splitDiceText[1])
    let rolledValues = []
    for (let i = 0; i < noOfDice; i++) {
        rolledValues.push(rollDice(diceType))
    }
    const totalValue = rolledValues.reduce((a, b) => a + b, 0)
    const returnMessage = {
        messageType: 'command',
        publicMessage: `${playerName} rolled ${noOfDice}d${diceType}.`,
        privateMessage: `${playerName} rolled ${noOfDice}d${diceType}. (For a total of: ${totalValue})`,
    }
    return returnMessage
}

const rollDice = (diceType) => {
    const minimum = 1
    const maximum = diceType
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum)
}
