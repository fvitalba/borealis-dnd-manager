import React, { ChangeEvent, useState, useEffect, MouseEvent } from 'react'
import { TextInputSelectorProps, TextInputOption } from './types'

const TextInputSelector = ({ title, placeholder, value, onSelectElement, label, autofocus, options }: TextInputSelectorProps) => {
    const [filterValue, setFilterValue] = useState('')
    const [showOptions, setShowOptions] = useState(false)

    const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value)
        const foundElement = options
            ? options.filter((opt) => opt.caption === e.target.value)
            : []
        if (foundElement.length > 0) {
            onSelectElement(foundElement[0].index)
            setShowOptions(false)
        }
    }

    const onSelectOption = (e: MouseEvent, opt: TextInputOption) => {
        e.stopPropagation()
        setFilterValue(opt.caption)
        onSelectElement(opt.index)
        setShowOptions(false)
    }

    const closeDropDown = (e: globalThis.MouseEvent) => {
        setShowOptions(true)
        if (e.target) {
            const targetNode = e.target as HTMLElement
            if (targetNode.parentElement?.className === 'borealis-text-input-selector-container')
                return
        }
        setShowOptions(false)
    }

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('click', closeDropDown)

            // On Unmount
            return () => {
                window.removeEventListener('click', closeDropDown)
            }
        }, 0)
    }, [])

    const filteredOptions = options
        ? options.filter((opt) => {
            if (filterValue !== '')
                return opt.caption.toUpperCase().includes(filterValue.toUpperCase())
            else
                return opt
        })
        : []

    return (<div className='borealis-text-input-container'>
        { label !== undefined
            ? <label className='mr-2 borealis-input-label'>{ label }</label>
            : null
        }
        <div className='borealis-text-input-selector-container'>
            <input title={ title } placeholder={ placeholder } type='text' value={ filterValue } onChange={ onChangeTextInput } className='borealis-text-input' autoFocus={ autofocus } onFocus={ () => setShowOptions(true) } />
            { showOptions ?
                <div className='borealis-text-input-options-container'>
                    { filteredOptions.map((opt) => {
                        const optionClass = opt.caption === value ? 'borealis-text-input-option-selected' : 'borealis-text-input-option'
                        return (<div className={ optionClass } key={ opt.index } onClick={ (e) => onSelectOption(e, opt) }>
                            <div className='borealis-text-input-option-icon'>{ opt.icon }</div>
                            <div className='borealis-text-input-option-caption'>{ opt.caption }</div>
                        </div>)
                    })
                    }
                </div>
                : null
            }
        </div>
    </div>)
}

export default TextInputSelector
