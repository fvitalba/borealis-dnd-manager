import React from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Path from '../classes/Path'
import ControlTool from '../enums/Tool'
import StateInterface from '../interfaces/StateInterface'
import { MapState } from '../reducers/mapReducer'
import { SettingsState } from '../reducers/settingsReducer'
import Canvas from './Canvas'

interface DrawingProps {
    gameState: Game,
    mapState: MapState,
    settingsState: SettingsState,
}

const Drawing = ({ gameState, mapState, settingsState }: DrawingProps) => {
    const getMap = () => {
        if (mapState.maps.length === 0)
            return undefined
        const currMap = mapState.maps.filter((map) => map.id === gameState.currentMapId)
        return currMap.length > 0 ? currMap[0] : mapState.maps[0]
    }
    const map = getMap()

    const renderDrawingLayer = (ctx: CanvasRenderingContext2D) => {
        if (!map) {
            return
        }
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
            ctx.lineWidth = currPath.drawSize
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
            ctx.lineWidth = currPath.drawSize
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
            className='drawing passthrough'
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

export default connect(mapStateToProps, undefined)(Drawing)
