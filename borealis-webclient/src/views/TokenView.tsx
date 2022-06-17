import React, { Ref, MouseEvent } from 'react'
import Token from '../classes/Token'

interface AbsolutePosition {
    left: number,
    top: number,
}

interface ImageStyle {
    width: number,
    height: number,
}

interface TokenViewProps {
    divStyle: AbsolutePosition,
    token: Token,
    isSelected: boolean,
    classes: Array<string>,
    imgStyle: ImageStyle,
    labelRef: Ref<HTMLLabelElement>,
    labelPosition: AbsolutePosition,
    onMouseDown: (arg0: MouseEvent<HTMLDivElement>) => void,
}

const TokenView = ({ divStyle, token, isSelected, classes, imgStyle, labelRef, labelPosition, onMouseDown }: TokenViewProps) => {
    return (
        <div style={ divStyle } title={ token.name } className={ classes.join(' ') } onMouseDown={ (e) => onMouseDown(e) }>
            <img className={ isSelected ? 'borealis-token-image-selected' : 'borealis-token-image' } src={ token.imageUrl } alt={ token.name } style={ imgStyle } />
            { token.showLabel ? <label className='borealis-token-label' ref={ labelRef } style={ labelPosition }>{ token.name }</label> : null }
        </div>
    )
}

export default TokenView
