import { Ref } from 'react'
import Game from '../../classes/Game'

export interface OverlayProps {
    gameState: Game,
    overlayRef: Ref<HTMLCanvasElement>
}
