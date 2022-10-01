import React from 'react'
import { FolderSelectorProps } from './types'

const FolderSelector = ({ elements, onSelectElement, selectedElementCaption }: FolderSelectorProps) => {
    const onClick = (event: React.MouseEvent, elementIndex: number) => {
        if (event.detail >= 2) {
            onSelectElement(elementIndex)
        }
    }

    return (<div className='borealis-folder-select-container'>
        { elements.map((element) => {
            const isSelected = selectedElementCaption ? (selectedElementCaption === element.caption) : false
            const containerClassName = isSelected ? 'borealis-folder-select-selected-element-container' : 'borealis-folder-select-element-container'

            return (
                <div className={ containerClassName } key={ element.index } onClick={ (e) => onClick(e, element.index) } >
                    <div className='borealis-folder-select-icon'>{ element.icon }</div>
                    <div className='borealis-folder-select-element'>
                        { element.caption }
                    </div>
                </div>)
        })}
    </div>)
}

export default FolderSelector
