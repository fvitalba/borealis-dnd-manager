import React from 'react'
import { connect } from 'react-redux'
import Canvas from './Canvas'

const Drawing = ({ game, settings }) => {
    const width = game.width * settings.scale
    const height = game.height * settings.scale

    const getMap = () => {
        if (game.maps.length === 0)
            return undefined
        const currMap = game.maps.filter((map) => parseInt(map.id) === parseInt(game.mapId))
        return currMap.length > 0 ? currMap[0] : game.maps[0]
    }
    const map = getMap()

    const renderDrawingLayer = (ctx) => {
        if (!map) {
            return
        }
        if (!ctx)
            return

        ctx.beginPath()
        ctx.clearRect(0, 0, width, height)
        for(let pathId = 0; pathId < map.drawPaths.length; pathId++) {
            const currPath = map.drawPaths[pathId]
            const tool = currPath.length > 0 ? currPath[0].tool : ''
            switch (tool) {
            case 'draw':
                draw(ctx, currPath)
                break
            case 'erease':
                erease(ctx, currPath)
                break
            default:
                break
            }
            ctx.stroke()
        }
    }

    const draw = (ctx, currPath) => {
        ctx.globalCompositeOperation = 'source-over'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = currPath[pointId].drawColor
            ctx.lineWidth = currPath[pointId].drawSize
            ctx.strokeStyle = currPath[pointId].drawColor
            if (pointId === 0) {
                ctx.moveTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            } else {
                ctx.lineTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            }
        }
    }

    const erease = (ctx, currPath) => {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        for (let pointId = 0; pointId < currPath.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.lineWidth = currPath[pointId].drawSize
            if (pointId === 0) {
                ctx.moveTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            } else {
                ctx.lineTo(currPath[pointId].x * settings.scale + settings.deltaX, currPath[pointId].y * settings.scale + settings.deltaY)
            }
        }
    }

    return (
        <Canvas
            className='drawing passthrough'
            width={ game.width }
            height={ game.height }
            draw={ renderDrawingLayer } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        settings: state.settings,
    }
}

export default connect(mapStateToProps, undefined)(Drawing)
