import React from 'react'
import { connect } from 'react-redux'
import Path from '@/classes/Path'
import { Canvas } from '@/components/Canvas'
import ControlTool from '@/enums/Tool'
import StateInterface from '@/interfaces/StateInterface'
import { getMap } from '@/utils/mapHandler'
import { DrawingProps } from './types'

const Drawing = ({ gameState, mapState, settingsState }: DrawingProps) => {
    const map = getMap(mapState, gameState.currentMapId)

    const renderDrawingLayer = (ctx: CanvasRenderingContext2D) => {
        if (!map)
            return
        if (!ctx)
            return

        ctx.beginPath()
        ctx.clearRect(0, 0, gameState.width, gameState.height)
        for(let pathId = 0; pathId < map.drawPaths.length; pathId++) {
            const currPath = map.drawPaths[pathId]
            const tool = currPath.points.length > 0 ? currPath.tool : ControlTool.Move
            switch (tool) {
            case ControlTool.Draw:
                draw(ctx, currPath)
                break
            case ControlTool.EreaseDraw:
                erease(ctx, currPath)
                break
            default:
                break
            }
            ctx.stroke()
        }
    }

    const draw = (ctx: CanvasRenderingContext2D, currPath: Path) => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.points.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = currPath.drawColor
            ctx.lineWidth = currPath.drawSize * settingsState.scale
            ctx.strokeStyle = currPath.drawColor
            const translatedPoint = currPath.points[pointId].translatePoint(settingsState.deltaX, settingsState.deltaY, settingsState.scale)
            if (pointId === 0) {
                ctx.moveTo(translatedPoint.x, translatedPoint.y)
            } else {
                ctx.lineTo(translatedPoint.x, translatedPoint.y)
            }
        }
    }

    const erease = (ctx: CanvasRenderingContext2D, currPath: Path) => {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.points.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.lineWidth = currPath.drawSize * settingsState.scale
            const translatedPoint = currPath.points[pointId].translatePoint(settingsState.deltaX, settingsState.deltaY, settingsState.scale)
            if (pointId === 0) {
                ctx.moveTo(translatedPoint.x, translatedPoint.y)
            } else {
                ctx.lineTo(translatedPoint.x, translatedPoint.y)
            }
        }
    }

    return (
        <Canvas
            id='drawing'
            className='borealis-drawing borealis-passthrough'
            width={ gameState.width }
            height={ gameState.height }
            draw={ renderDrawingLayer } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        settingsState: state.settings,
    }
}

export default connect(mapStateToProps, {})(Drawing)
