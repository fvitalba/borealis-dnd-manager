const COMMAND_NOT_VALID_ERR = 'Command is not valid.'

export const convertChatMessage = (playerName, inputChatMessage) => {
    const splitMessage = inputChatMessage.split(' ')

    switch (splitMessage[0].toUpperCase()) {
    case '/R', '/ROLL':
        if (splitMessage.length < 2)
            return [COMMAND_NOT_VALID_ERR, 'error']

        return rollDiceCommand(playerName, splitMessage[1].toUpperCase())
    case '/W', '/WHISPER':
        return [COMMAND_NOT_VALID_ERR, 'error']
    default:
        return [inputChatMessage, 'message']
    }
}

const rollDiceCommand = (playerName, diceText) => {
    const splitDiceText = diceText.split('D')
    if (splitDiceText.length !== 2)
        return [COMMAND_NOT_VALID_ERR, 'error']

    const noOfDice = parseInt(splitDiceText[0])
    const diceType = parseInt(splitDiceText[1])
    let rolledValues = []
    for (let i = 0; i < noOfDice; i++) {
        rolledValues.push(rollDice(diceType))
    }
    return [`${playerName} rolled the following values ${rolledValues}, for a total of: ${rolledValues.reduce((a, b) => a + b, 0)}.`, 'command']
}

const rollDice = (diceType) => {
    const minimum = 1
    const maximum = diceType
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum)
}
