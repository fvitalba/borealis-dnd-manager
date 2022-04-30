import React, { ForwardedRef, forwardRef, MouseEvent, ReactElement } from 'react'

interface ActionButtonProps {
    title: string,
    value: ReactElement,
    onClick: (arg0: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}

const ActionButton = forwardRef(({ title, value, onClick, disabled }: ActionButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
    return (
        <button title={ title } onClick={ onClick } className={ 'borealis-action-button' } disabled={ disabled } ref={ ref }>
            <span role='img' aria-label={ title } className='borealis-action-button-content'>{ value }</span>
        </button>
    )
})
ActionButton.displayName = 'ActionButton'

export default ActionButton
