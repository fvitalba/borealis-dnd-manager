import { ReactNode } from 'react'

interface FolderSelectorElement {
    index: number,
    caption: string,
    icon?: ReactNode,
}

export interface FolderSelectorProps {
    elements: Array<FolderSelectorElement>,
    onSelectElement: (selectedElementIndex: number) => void,
    selectedElementCaption?: string,
}
