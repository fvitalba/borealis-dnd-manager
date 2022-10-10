import React from 'react'
import { CharacterStatsPanelRowProps } from './types'

const CharacterStatsPanelRow = ({ character }: CharacterStatsPanelRowProps) => {
    return (
        <tr className='borealis-stats-panel-character-row'>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.name }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.strength }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.dexterity }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.constitution }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.intelligence }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.wisdom }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.charisma }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.armorclass }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.maxHealth }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.currHealth }
            </td>
            <td className='borealis-stats-panel-character-tablecell'>
                { character.username }
            </td>
        </tr>
    )
}

export default CharacterStatsPanelRow
