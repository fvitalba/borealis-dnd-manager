import React from 'react'
import CharacterStatsPanelRow from './CharacterStatsPanelRow'
import { CharacterStatsPanelViewProps } from './types'

const CharacterStatsPanelView = ({ characters, selectedCharacterGuid }: CharacterStatsPanelViewProps) => {
    return (
        <div className='borealis-stats-panel-container'>
            <table className='borealis-stats-panel-table'>
                <tr className='borealis-stats-panel-character-header'>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Name
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Strength
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Dexterity
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Constitution
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Intelligence
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Wisdom
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Charisma
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Armor Class
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Max. Health
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Current Health
                    </th>
                    <th className='borealis-stats-panel-character-tablecell'>
                        Username
                    </th>
                </tr>
                { characters.map((character) => {
                    return <CharacterStatsPanelRow key={ character.guid } character={ character } />
                })}
            </table>
        </div>
    )
}

export default CharacterStatsPanelView
