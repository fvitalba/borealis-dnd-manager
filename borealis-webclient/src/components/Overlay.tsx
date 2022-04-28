import React, { Ref } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import StateInterface from '../interfaces/StateInterface'

interface OverlayProps {
    gameState: Game,
    overlayRef: Ref<HTMLCanvasElement>
}

const Overlay = ({ gameState, overlayRef }: OverlayProps) => {
    const canvasRef = overlayRef

    return (
        <canvas
            className='overlay'
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
