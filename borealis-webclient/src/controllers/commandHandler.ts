const COMMAND_NOT_VALID_ERR = 'Command is not valid.'
const commandNotValidMessage = {
    messageType: 'error',
    targetPlayerName: '',
    privateMessage: COMMAND_NOT_VALID_ERR,
    publicMessage: COMMAND_NOT_VALID_ERR,
}

export const convertChatMessage = (playerName: string, inputChatMessage: string, character: string) => {
    const splitMessage = inputChatMessage.split(' ')
    let returnMessage

    switch (splitMessage[0].toUpperCase()) {
    case '/R':
    case '/ROLL':
        if (splitMessage.length < 2)
            return commandNotValidMessage

        return rollDiceCommand(playerName, character, splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2))
    case '/HR':
    case '/HIDDENROLL':
        if (splitMessage.length < 2)
            return commandNotValidMessage

        return rollHiddenDiceCommand(playerName, character, splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2))
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

const rollDiceCommand = (playerName: string, character: string, diceText: string, additionalText: Array<string>) => {
    // eslint-disable-next-line no-unused-vars
    const [noOfDice, diceType, rolledValues, totalValue] = executeDiceRolls(character, diceText, additionalText)
    const convertedMessage = `${playerName} rolled the following values ${formatRolledValues(rolledValues)}, for a total of: ${totalValue}.`
    const returnMessage = {
        messageType: 'command',
        targetPlayerName: '',
        publicMessage: convertedMessage,
        privateMessage: convertedMessage,
    }
    return returnMessage
}

const rollHiddenDiceCommand = (playerName: string, character: string, diceText: string, additionalText: Array<string>) => {
    // eslint-disable-next-line no-unused-vars
    const [noOfDice, diceType, _rolledValues, totalValue] = executeDiceRolls(character, diceText, additionalText)
    const returnMessage = {
        messageType: 'command',
        targetPlayerName: '',
        publicMessage: `${playerName} rolled ${noOfDice}d${diceType}.`,
        privateMessage: `${playerName} rolled ${noOfDice}d${diceType}. (For a total of: ${totalValue})`,
    }
    return returnMessage
}

const whisperCommand = (targetPlayerName: string, whisperText: Array<string>) => {
    const returnMessage = {
        messageType: 'whisper',
        targetPlayerName: targetPlayerName,
        publicMessage: '',
        privateMessage: whisperText.join(' '),
    }
    return returnMessage
}

const executeDiceRolls = (character: string, diceText: string, additionalText: Array<string>) => {
    const splitDiceText = diceText.split('D')
    if (splitDiceText.length !== 2)
        return commandNotValidMessage

    const noOfDice = parseInt(splitDiceText[0])
    const diceType = parseInt(splitDiceText[1])

    let totalValue = 0
    let rolledValues = []
    const rollCondition = retrieveRollCondition(additionalText)
    for (let i = 0; i < noOfDice; i++) {
        let diceValue = 0
        let diceValue2 = 0
        switch (rollCondition) {
        case 'DADV':
            diceValue = rollDice(diceType)
            diceValue2 = rollDice(diceType)
            rolledValues.push({ diceValue, diceValue2 })
            totalValue += diceValue < diceValue2 ? diceValue : diceValue2
            break
        case 'ADV':
            diceValue = rollDice(diceType)
            diceValue2 = rollDice(diceType)
            rolledValues.push({ diceValue, diceValue2 })
            totalValue += diceValue > diceValue2 ? diceValue : diceValue2
            break
        default:
            diceValue = rollDice(diceType)
            rolledValues.push(diceValue)
            totalValue += diceValue
            break
        }
    }
    if (additionalText.length > 0)
        switch (additionalText[0].toUpperCase()) {
        case '+':
            totalValue += modifierFromText(character,additionalText[1])
            break
        case '-':
            totalValue -= modifierFromText(character,additionalText[1])
            break
        }
    return [noOfDice, diceType, rolledValues, totalValue]
}

const rollDice = (diceType: number) => {
    const minimum = 1
    const maximum = diceType
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum)
}

const modifierFromText = (character, inputText: string) => {
    if (!inputText || (inputText === ''))
        return 0
    const characterValue = extractAttributeFromCharacter(character, inputText)
    if (characterValue === -20) {
        if (parseInt(inputText))
            return parseInt(inputText)
    } else
        return characterValue

    return 0
}

const extractAttributeFromCharacter = (character, attributeCode: string) => {
    if (!character || !attributeCode)
        return 0
    switch (attributeCode.toUpperCase()) {
    case 'STR':
    case 'STRENGTH':
        return modifierFromStat(character.strength)
    case 'DEX':
    case 'DEXTERITY':
        return modifierFromStat(character.dexterity)
    case 'CON':
    case 'CONSTITUTION':
        return modifierFromStat(character.constitution)
    case 'INT':
    case 'INTELLIGENCE':
        return modifierFromStat(character.intelligence)
    case 'WIS':
    case 'WISDOM':
        return modifierFromStat(character.wisdom)
    case 'CHA':
    case 'CHARISMA':
        return modifierFromStat(character.charisma)
    default:
        return -20
    }
}

const modifierFromStat = (statValue: number): number => {
    return Math.floor((statValue - 10) / 2)
}

const formatRolledValues = (rolledValues: Array<number>): string => {
    let formattedRolls = ''
    rolledValues.map((rolledValue) => {
        if (isNaN(rolledValue))
            formattedRolls += `[${rolledValue.diceValue}, ${rolledValue.diceValue2}]`
        else
            formattedRolls += `${rolledValue}`
    })
    return formattedRolls
}

const retrieveRollCondition = (inputTextArray: Array<string>): string => {
    const condition = inputTextArray.filter((inputText) => {
        switch (inputText.toUpperCase()) {
        case 'DADV':
        case 'DISADVANTAGE':
            return 'DADV'
        case 'ADV':
        case 'ADVANTAGE':
        case 'INSP':
        case 'INSPIRATION':
            return 'ADV'
        default:
            return null
        }
    })

    if (condition.length > 0)
        return condition[0]
    else
        return ''
}
