import React from 'react'
import { FolderSelectorProps } from './types'

const FolderSelector = ({ elements, onSelectElement }: FolderSelectorProps) => {
    const onClick = (event: React.MouseEvent, elementIndex: number) => {
        if (event.detail >= 2) {
            onSelectElement(elementIndex)
        }
    }

    return (<div className='borealis-folder-select-container'>
        { elements.map((element) =>
            <div className='borealis-folder-select-element-container' key={ element.index } onClick={ (e) => onClick(e, element.index) } >
                { element.icon }
                <div className='borealis-folder-select-element'>
                    { element.caption }
                </div>
            </div>
        )}
    </div>)
}

export default FolderSelector
