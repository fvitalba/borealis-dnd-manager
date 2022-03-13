const COMMAND_NOT_VALID_ERR = 'Command is not valid.'
const commandNotValidMessage = {
    messageType: 'error',
    targetPlayerName: '',
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
        if (splitMessage.length < 3)
            return commandNotValidMessage

        return whisperCommand(splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2))
    default:
        returnMessage = {
            messageType: 'message',
            targetPlayerName: '',
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
        targetPlayerName: '',
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
        targetPlayerName: '',
        publicMessage: `${playerName} rolled ${noOfDice}d${diceType}.`,
        privateMessage: `${playerName} rolled ${noOfDice}d${diceType}. (For a total of: ${totalValue})`,
    }
    return returnMessage
}

const whisperCommand = (targetPlayerName, whisperText) => {
    const returnMessage = {
        messageType: 'whisper',
        targetPlayerName: targetPlayerName,
        publicMessage: '',
        privateMessage: whisperText.join(' '),
    }
    return returnMessage
}

const rollDice = (diceType) => {
    const minimum = 1
    const maximum = diceType
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum)
}
