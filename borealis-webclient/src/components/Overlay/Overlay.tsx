import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '@/interfaces/StateInterface'
import { OverlayProps } from './types'

const Overlay = ({ gameState, overlayRef }: OverlayProps) => {
    const canvasRef = overlayRef

    return (
        <canvas
            className='borealis-overlay'
            ref={ canvasRef }
            width={ gameState.width }
            height={ gameState.height } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
    }
}

export default connect(mapStateToProps, {})(Overlay)
