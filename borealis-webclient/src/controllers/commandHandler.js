const random = require('random')
const COMMAND_NOT_VALID_ERR = 'Command is not valid.'

export const convertChatMessage = (playerName, inputChatMessage) => {
    const splitMessage = inputChatMessage.split(' ')
    let upperLimit = 0
    let diceRollResult = 0

    switch (splitMessage[0].toUpperCase()) {
    case '/R', '/ROLL':
        console.log(random)
        if (splitMessage.length < 2)
            return [COMMAND_NOT_VALID_ERR, 'error']

        if ((splitMessage[1].toUpperCase().substr(0,2).includes('1D')) && (splitMessage[1].length >= 4)) {
            upperLimit = parseInt(splitMessage[1].toUpperCase().substr(2,2))
            diceRollResult = random.int(1, upperLimit)
            return [`${playerName} rolled a ${diceRollResult}`, 'command']
        } else {
            return [COMMAND_NOT_VALID_ERR, 'error']
        }
    case '/W', '/WHISPER':
        return [COMMAND_NOT_VALID_ERR, 'error']
    default:
        return [inputChatMessage, 'message']
    }
}
