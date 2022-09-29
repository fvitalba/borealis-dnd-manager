import React from 'react'
import TokenType from '@/enums/TokenType'
import { TokenConfig } from './TokenConfig'
import { ControlPanelSubcontainer } from '..'
import { ControlPanelRow } from '..'
import { TextInput } from '@/components/TextInput'
import { ActionButton } from '@/components/ActionButton'
import {
    BorealisAddNewTokenIcon,
    BorealisTokenIsNpcIcon,
    BorealisTokenIsPcIcon,
} from '@/views/Icons'
import { FolderSelector } from '@/components/FolderSelector'
import { TokenToolViewProps } from './types'

const TokenToolView = ({ newTokenName, setNewTokenName, isCreateTokenEnabled, createToken, tokens, currSelectedTokenName, onTokenSelect, showSelectedToken }: TokenToolViewProps) => {
    const tokenOptions = tokens.map((token, index) => {
        return {
            index: index,
            caption: `${token.name}`,
            icon: token.type === TokenType.PC ? <BorealisTokenIsPcIcon /> : <BorealisTokenIsNpcIcon />,
        }
    }).filter((option) => option.caption !== undefined)

    const onFolderSelectElement = (elementIndex: number) => {
        onTokenSelect(elementIndex, true)
    }

    const selectedToken = showSelectedToken ? tokens.filter((token) => token.name === currSelectedTokenName) : []

    return (
        <ControlPanelSubcontainer>
            <ControlPanelRow>
                <TextInput title='New Token Name' placeholder='Token Name' value={ newTokenName } onChange={ setNewTokenName } autofocus={ true } />
                <ActionButton title='Create new Token' value={ <BorealisAddNewTokenIcon /> } onClick={ createToken } disabled={ (newTokenName === '') || (!isCreateTokenEnabled) } />
            </ControlPanelRow>
            <ControlPanelRow>
                <FolderSelector elements={ tokenOptions } onSelectElement={ onFolderSelectElement } />
            </ControlPanelRow>
            { selectedToken.length > 0
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
