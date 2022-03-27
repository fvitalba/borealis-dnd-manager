import Button from './Button'

const DiceRollButtonView = ({ rollDice, selectorPosition, showSelector, toggleSelector, selectorRef, rollDiceButtonRef }) => {
    return (
        <div className='dice-roll-button-container'>
            { showSelector
                ? <div className='dice-roll-selector-container' style={ selectorPosition } ref={ selectorRef }>
                    <Button title='d20' value={ 'd20' } onClick={ () => rollDice(20) } className='dice-roll-button' />
                    <Button title='d12' value={ 'd12' } onClick={ () => rollDice(12) } className='dice-roll-button' />
                    <Button title='d10' value={ 'd10' } onClick={ () => rollDice(10) } className='dice-roll-button' />
                    <Button title='d8' value={ 'd8' } onClick={ () => rollDice(8) } className='dice-roll-button' />
                    <Button title='d6' value={ 'd6' } onClick={ () => rollDice(6) } className='dice-roll-button' />
                    <Button title='d4' value={ 'd4' } onClick={ () => rollDice(4) } className='dice-roll-button' />
                </div>
                : null
            }
            <Button title='Roll dice' value={ '/D' } onClick={ toggleSelector } ref={ rollDiceButtonRef } />
        </div>
    )
}

export default DiceRollButtonView
