import React, { ChangeEvent } from 'react'
import Token from '../classes/Token'
import TokenType from '../enums/TokenType'
import TokenConfig from '../components/TokenConfig'
import ControlPanelSubcontainer from './GenericViews/ControlPanelSubcontainer'
import ControlPanelRow from './GenericViews/ControlPanelRow'
import TextInput from './GenericViews/TextInput'
import TextInputSelector from './GenericViews/TextInputSelector'
import ActionButton from './GenericViews/ActionButton'
import {
    BorealisAddNewTokenIcon,
    BorealisPlayIcon,
} from './Icons'

interface TokenToolViewProps {
    newTokenName: string,
    setNewTokenName: (e: ChangeEvent<HTMLInputElement>) => void,
    isCreateTokenEnabled: boolean,
    createToken: () => void,
    tokens: Array<Token>,
    selectedTokenName: string,
    currSelectedTokenName: string,
    onTokenSelect: (tokenIndex: number) => void,
    onSubmitSelectToken: () => void,
    isSubmitSelectionEnabled: boolean,
    showSelectedToken: boolean,
}

const TokenToolView = ({ newTokenName, setNewTokenName, isCreateTokenEnabled, createToken, tokens, selectedTokenName, currSelectedTokenName, onTokenSelect, onSubmitSelectToken, isSubmitSelectionEnabled, showSelectedToken }: TokenToolViewProps) => {
    const tokenOptions = tokens.map((token, index) => {
        return {
            index: index,
            caption: `${token.name} (${TokenType[token.type]})`,
        }
    }).filter((option) => option.caption !== undefined)

    const onSelectElement = (elementIndex: number) => {
        onTokenSelect(elementIndex)
    }

    const selectedToken = showSelectedToken ? tokens.filter((token) => token.name === currSelectedTokenName) : []

    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <TextInput title='New Token Name' placeholder='Token Name' value={ newTokenName } onChange={ setNewTokenName } autofocus={ true } />
                <ActionButton title='Create new Token' value={ <BorealisAddNewTokenIcon /> } onClick={ createToken } disabled={ (newTokenName === '') || (!isCreateTokenEnabled) } />
            </ControlPanelRow>
            <ControlPanelRow>
                <TextInputSelector title='Choose Token' placeholder='Choose Token' value={ selectedTokenName } onSelectElement={ onSelectElement } label='Choose existing Map:' options={ tokenOptions } />
                <ActionButton title='Select map' value={ <BorealisPlayIcon /> } onClick={ onSubmitSelectToken } disabled={ !isSubmitSelectionEnabled } />
            </ControlPanelRow>
            {
                tokens.length > 0
                    ? <ControlPanelRow>
                        { selectedToken.map((token, index) => (
                            <TokenConfig key={ `token${index}` } token={ token } />
                        ))}
                    </ControlPanelRow>
                    : null
            }
        </ControlPanelSubcontainer>
    )
}

export default TokenToolView
