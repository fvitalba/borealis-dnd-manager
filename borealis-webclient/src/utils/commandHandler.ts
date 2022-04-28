import Character from '../classes/Character'
import Message from '../classes/Message'
import DiceType from '../enums/DiceType'
import MessageType from '../enums/MessageType'

const COMMAND_NOT_VALID_ERR = 'Command is not valid.'
interface PartialMessage {
    type: MessageType,
    targetUsername: string,
    publicMessage: string,
    privateMessage: string,
}
const commandNotValidMessage: PartialMessage = {
    type: MessageType.Error,
    targetUsername: '',
    privateMessage: COMMAND_NOT_VALID_ERR,
    publicMessage: COMMAND_NOT_VALID_ERR,
}

interface DiceRoll {
    firstRoll: number,
    secondRoll: number,
}

interface DiceRollResult {
    noOfDice: number,
    diceType: DiceType,
    rolledValues: Array<DiceRoll>,
    totalValue: number,
}

export const convertChatMessage = (userName: string, inputChatMessage: string, character: Character, playerInfo?: string, timestamp?: number): Message => {
    const splitMessage = inputChatMessage.split(' ')
    let returnMessage

    switch (splitMessage[0].toUpperCase()) {
    case '/R':
    case '/ROLL':
        if (splitMessage.length < 2)
            return parseFullMessage(commandNotValidMessage, userName, playerInfo, timestamp)

        return parseFullMessage(rollDiceCommand(userName, character, splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2)), userName, playerInfo, timestamp)
    case '/HR':
    case '/HIDDENROLL':
        if (splitMessage.length < 2)
            return parseFullMessage(commandNotValidMessage, userName, playerInfo, timestamp)

        return parseFullMessage(rollHiddenDiceCommand(userName, character, splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2)), userName, playerInfo, timestamp)
    case '/W':
    case '/WHISPER':
        if (splitMessage.length < 3)
            return parseFullMessage(commandNotValidMessage, userName, playerInfo, timestamp)

        return parseFullMessage(whisperCommand(splitMessage[1].toUpperCase(), splitMessage.splice(2, splitMessage.length - 2)), userName, playerInfo, timestamp)
    default:
        returnMessage = new Message(MessageType.Message, userName, playerInfo ? playerInfo : '', inputChatMessage, undefined, timestamp, '', inputChatMessage, false)
        return returnMessage
    }
}

const parseFullMessage = (partialMessage: PartialMessage, userName: string, playerInfo?: string, timestamp?: number): Message => {
    return new Message(partialMessage.type, userName, playerInfo ? playerInfo : '', partialMessage.publicMessage, undefined, timestamp, partialMessage.targetUsername, partialMessage.privateMessage, false)
}

const rollDiceCommand = (userName: string, character: Character, diceText: string, additionalText: Array<string>): PartialMessage => {
    const diceRollResult = executeDiceRolls(character, diceText, additionalText)
    if (diceRollResult === null)
        return commandNotValidMessage
    const convertedMessage = `${userName} rolled the following values ${formatRolledValues(diceRollResult.rolledValues)}, for a total of: ${diceRollResult.totalValue}.`
    const returnMessage: PartialMessage = {
        type: MessageType.Command,
        targetUsername: '',
        publicMessage: convertedMessage,
        privateMessage: convertedMessage,
    }
    return returnMessage
}

const rollHiddenDiceCommand = (userName: string, character: Character, diceText: string, additionalText: Array<string>): PartialMessage => {
    const diceRollResult = executeDiceRolls(character, diceText, additionalText)
    if (diceRollResult === null)
        return commandNotValidMessage
    const returnMessage: PartialMessage = {
        type: MessageType.Command,
        targetUsername: '',
        publicMessage: `${userName} rolled ${diceRollResult.noOfDice}${diceRollResult.diceType}.`,
        privateMessage: `${userName} rolled ${diceRollResult.noOfDice}${diceRollResult.diceType}. (For a total of: ${diceRollResult.totalValue})`,
    }
    return returnMessage
}

const whisperCommand = (targetUserName: string, whisperText: Array<string>): PartialMessage => {
    const returnMessage: PartialMessage = {
        type: MessageType.Whisper,
        targetUsername: targetUserName,
        publicMessage: '',
        privateMessage: whisperText.join(' '),
    }
    return returnMessage
}

const executeDiceRolls = (character: Character, diceText: string, additionalText: Array<string>): DiceRollResult | null => {
    const splitDiceText = diceText.split('D')
    if (splitDiceText.length !== 2)
        return null

    const noOfDice = parseInt(splitDiceText[0])
    const diceType = parseInt(splitDiceText[1])

    let totalValue = 0
    const rolledValues = new Array<DiceRoll>()
    const rollCondition: string = retrieveRollCondition(additionalText)
    for (let i = 0; i < noOfDice; i++) {
        let firstRoll = 0
        let secondRoll = 0
        switch (rollCondition) {
        case 'DADV':
            firstRoll = rollDice(diceType)
            secondRoll = rollDice(diceType)
            rolledValues.push({ firstRoll, secondRoll })
            totalValue += firstRoll < secondRoll ? firstRoll : secondRoll
            break
        case 'ADV':
            firstRoll = rollDice(diceType)
            secondRoll = rollDice(diceType)
            rolledValues.push({ firstRoll, secondRoll })
            totalValue += firstRoll > secondRoll ? firstRoll : secondRoll
            break
        default:
            firstRoll = rollDice(diceType)
            rolledValues.push({ firstRoll, secondRoll })
            totalValue += firstRoll
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
    return {
        noOfDice: noOfDice,
        diceType: diceType,
        rolledValues: rolledValues,
        totalValue: totalValue,
    }
}

const rollDice = (diceType: number): number => {
    const minimum = 1
    const maximum = diceType
    return Math.floor((Math.random() * (maximum - minimum + 1)) + minimum)
}

const modifierFromText = (character: Character, inputText: string): number => {
    if (!inputText || (inputText === ''))
        return 0
    const characterValue = character.getModifierFromString(inputText)
    if (characterValue === -20) {
        if (parseInt(inputText))
            return parseInt(inputText)
    } else
        return characterValue

    return 0
}

const formatRolledValues = (rolledValues: Array<DiceRoll>): string => {
    let formattedRolls = ''
    rolledValues.map((rolledValue) => {
        if (rolledValue.secondRoll > 0)
            formattedRolls += `[${rolledValue.firstRoll}, ${rolledValue.secondRoll}]`
        else
            formattedRolls += `${rolledValue.firstRoll}`
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
            return ''
        }
    })

    if (condition.length > 0)
        return condition[0]
    else
        return ''
}
