import React, { MouseEvent, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Path from '../../classes/Path'
import Point from '../../classes/Point'
import ControlTool from '../../enums/Tool'
import UserType from '../../enums/UserType'
import { useLoading } from '../../hooks/useLoading'
import { pushCursor, pushDrawPath, pushFogPath, pushTokens, requestRefresh, useWebSocket } from '../../hooks/useSocket'
import StateInterface from '../../interfaces/StateInterface'
import { updateMaps } from '../../reducers/mapReducer'
import { setTokenSelected } from '../../reducers/gameReducer'
import { updateTokens, toggleTokenValue } from '../../reducers/tokenReducer'
import { GAME_REQUEST_REFRESH } from '../../utils/loadingTasks'
import { getMap } from '../../utils/mapHandler'
import GameView from './GameView'
import { GameProps } from './types'

const GameComponent = ({ gameState, mapState, tokenState, settingsState, metadataState, updateTokens, toggleTokenValue, updateMaps, setTokenSelected }: GameProps) => {
    const overlayRef = useRef<HTMLCanvasElement>(null)
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    const getCurrentToolRadius = (): number => {
        const radius = (settingsState.tool === ControlTool.Draw) || (settingsState.tool === ControlTool.EreaseDraw) ? settingsState.drawSize : settingsState.fogRadius
        return radius
    }

    const radius = getCurrentToolRadius()
    let currentPath = new Path([], radius, 0, settingsState.tool, settingsState.drawColor, radius)

    /****************************************************
     * Update Functions                                 *
     ****************************************************/
    /*
    const updateCursors = (x, y, name, guid) => {
        const cursors = Object.assign({}, gameState.metadata.cursors)
        cursors[guid] = { x: x, y: y, time: new Date(), u: name }
        setGameState({
            ...gameState,
            metadata: {
                ...gameState.metadata,
                cursors: cursors,
            },
        })
    }
    */

    /****************************************************
     * Control Functions                                *
     ****************************************************/
    const dragSelectedTokens = (e: MouseEvent) => {
        if (settingsState.tool !== ControlTool.Move)
            return

        const selectedTokens = tokenState.tokens.filter((token) => token.selected)
        if (selectedTokens.length > 0) {
            const newTokens = tokenState.tokens.map((token) => {
                const newToken = token.copy()
                newToken.x = token.x + (e.movementX / settingsState.scale)
                newToken.y = token.y + (e.movementY / settingsState.scale)
                return !token.selected ? token : newToken
            })
            updateTokens(newTokens)
        }
    }

    /****************************************************
     * Drawing Functions                                *
     ****************************************************/
    const setPointerOutline = (x: number, y: number, color: string, radius: number) => {
        if (color === null)
            return
        if (!overlayRef || !overlayRef.current)
            return
        const ctx = overlayRef.current.getContext('2d')
        if (!ctx)
            return
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x, y, radius / 1.5, 0, 2*Math.PI)
        ctx.stroke()
        ctx.closePath()
    }

    const updateCurrentDrawPath = () => {
        if (!overlayRef || !overlayRef.current)
            return
        const ctx = overlayRef.current.getContext('2d')
        if (!ctx)
            return
        ctx.beginPath()
        for (let pointId = 0; pointId < currentPath.points.length; pointId++) {
            const drawColor = settingsState.tool === ControlTool.Draw ? currentPath.drawColor : 'black'
            ctx.lineCap = 'round'
            ctx.fillStyle = drawColor
            ctx.lineWidth = currentPath.drawSize
            ctx.strokeStyle = drawColor
            if (pointId === 0) {
                ctx.moveTo(currentPath.points[pointId].x, currentPath.points[pointId].y)
            } else {
                ctx.lineTo(currentPath.points[pointId].x, currentPath.points[pointId].y)
            }
        }
        ctx.stroke()
    }

    const updateCurrentFogPath = () => {
        if (!overlayRef || !overlayRef.current)
            return
        const ctx = overlayRef.current.getContext('2d')
        if (!ctx)
            return
        ctx.beginPath()
        for (let pointId = 0; pointId < currentPath.points.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = 'white'
            ctx.lineWidth = currentPath.r
            ctx.strokeStyle = 'white'
            if (pointId === 0) {
                ctx.moveTo(currentPath.points[pointId].x, currentPath.points[pointId].y)
            } else {
                ctx.lineTo(currentPath.points[pointId].x, currentPath.points[pointId].y)
            }
        }
        ctx.stroke()
    }

    const clearOverlay = () => {
        if (!overlayRef || !overlayRef.current)
            return
        const ctx = overlayRef.current.getContext('2d')
        if (!ctx)
            return
        ctx.clearRect(0, 0, gameState.width, gameState.height)
    }

    /****************************************************
     * Event Handlers                                   *
     ****************************************************/
    const onKeyDown = (/*e*/) => {
        //TODO: Update onKeyDown function
        /*
        for (let x of [document.activeElement, e.target])
            //TODO: Check if we can use triple equal
            if (x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) // eslint-disable-line eqeqeq
                return e

        const moveFactor = e.shiftKey ? 100 : 10
        const moveSelectedTokens = () => {
            updateTokens(token => {
                if (token.selected) {
                    switch (e.keyCode) {
                        case 27: // escape
                            token.selected = false
                            break
                        case 37: // left
                            token.x -= moveFactor
                            break
                        case 38: // up
                            token.y -= moveFactor
                            break
                        case 39: // right
                            token.x += moveFactor
                            break
                        case 40: // down
                            token.y += moveFactor
                            break
                        default: return
                    }
                    e.preventDefault()
                }
                return token
            })
        }
        switch (e.keyCode) {
            case 27:
            case 37:
            case 38:
            case 39:
            case 40:
                moveSelectedTokens(e)
                break
            default: return
        }
        */
    }

    /*
    const onKeyPress = (e) => {
        if (!gameState.metadata.isHost)
            return e
        for (let x of [document.activeElement, e.target])
            //TODO: Check if we can use triple equal
            if ((x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) || (x.tagName == 'BUTTON'))
                return e

        const cp = gameState.cpRef.current
        switch(e.code) {
            case 'KeyC':
                if (e.shiftKey)
                    cp.copyJson() // dump json to clipboard
                break
            case 'KeyH':
                toggleControlPanelVisibility('hidden')
                break
            case 'KeyG':
                setGameState({
                    ...gameState,
                    settings: {
                        ...gameState.settings,
                        tool: 'fog',
                    },
                })
                break
            case 'KeyL':
                if (e.shiftKey)
                    loadFromLocalStorage()
                else
                    saveToLocalStorage()
                break
            case 'KeyM':
                toggleControlPanelVisibility('toggleOnMaps')
                break
            case 'KeyP':
                setGameState({
                    ...gameState,
                    settings: {
                        ...gameState.settings,
                        tool: 'draw',
                    },
                })
                break
            case 'KeyT':
                toggleControlPanelVisibility('toggleOnTokens')
                break
            case 'KeyV':
                if (e.shiftKey)
                    cp.pasteJson() // load json from clipboard
                else
                setGameState({
                    ...gameState,
                    settings: {
                        ...gameState.settings,
                        tool: 'move',
                    },
                })
                break
            default: return
        }
    }
    */

    const onMouseUp = (e: MouseEvent<Element, globalThis.MouseEvent>) => {
        const currMap = getMap(mapState, gameState.currentMapId)
        if ((currMap) && (currentPath.points.length > 0)) {
            const scaledCurrPath = currentPath
            scaledCurrPath.points = currentPath.points.map((point) => {
                return new Point((point.x - settingsState.deltaX) / settingsState.scale, (point.y - settingsState.deltaY) / settingsState.scale)
            })
            scaledCurrPath.r = currentPath.r / settingsState.scale
            const fogPaths = currMap.fogPaths
            const drawPaths = currMap.drawPaths
            switch (settingsState.tool) {
            case ControlTool.Fog:
            case ControlTool.EreaseFog:
                fogPaths.push(scaledCurrPath)
                if (webSocketContext.ws)
                    pushFogPath(webSocketContext.ws, webSocketContext.wsSettings, scaledCurrPath)
                break
            case ControlTool.Draw:
            case ControlTool.EreaseDraw:
                drawPaths.push(scaledCurrPath)
                if (webSocketContext.ws)
                    pushDrawPath(webSocketContext.ws, webSocketContext.wsSettings, scaledCurrPath)
                break
            default: break
            }
            const radius = getCurrentToolRadius()
            currentPath = new Path([], radius, 0, settingsState.tool, settingsState.drawColor, radius)
            const updatedMaps = mapState.maps.map((map) => {
                const newMap = map.copy()
                newMap.fogPaths = fogPaths
                newMap.drawPaths = drawPaths
                return map.id === currMap.id ? newMap : map
            })
            updateMaps(updatedMaps)
        }

        if (gameState.tokenSelected) {
            let deselectTokens = false
            for (const x of [document.activeElement, (e.target as HTMLElement)])
                if (x?.id?.toUpperCase() === 'BACKGROUND')
                    deselectTokens = true
            if (deselectTokens)
                tokenState.tokens.map((token) => token.selected ? toggleTokenValue(token.guid, 'selected') : null)

            if (webSocketContext.ws)
                pushTokens(webSocketContext.ws, webSocketContext.wsSettings, tokenState.tokens)
        }
    }

    const onMouseDown = (e: MouseEvent<Element, globalThis.MouseEvent>) => {
        const selectedTokens = tokenState.tokens.filter((token) => token.selected)
        if (selectedTokens.length > 0) {
            let deselectTokens = false
            for (const x of [document.activeElement, (e.target as HTMLElement)])
                if (x?.className.toUpperCase() === 'BACKGROUND')
                    deselectTokens = true
            if (deselectTokens) {
                tokenState.tokens.map((token) => token.selected ? toggleTokenValue(token.guid,'selected') : null)
                setTokenSelected(false)
            }
        }
        for (const x of [document.activeElement, (e.target as HTMLElement)])
            //TODO: Verify if this is still ok
            //if ((['INPUT', 'BUTTON'].indexOf(x?.tagName.toUpperCase() || '') >= 0) || (['TEXT', 'NUMBER'].indexOf(x?.type.toUpperCase()) >= 0))
            if (['INPUT', 'BUTTON'].indexOf(x?.tagName.toUpperCase() || '') >= 0)
                return e

        if (e.buttons & 1) {
            const radius = getCurrentToolRadius()
            currentPath = new Path([], radius, 0, settingsState.tool, settingsState.drawColor, radius)
            currentPath.points.push(new Point(e.pageX, e.pageY))
        }
    }

    const onMouseMove = (e: MouseEvent<Element, globalThis.MouseEvent>) => {
        const overlay = overlayRef
        if (!overlay)
            return

        clearOverlay()
        const x = e.pageX, y = e.pageY
        if (settingsState.shareMouse) {
            if (webSocketContext.ws)
                pushCursor(webSocketContext.ws, webSocketContext.wsSettings, x, y)
        }
        switch (settingsState.tool) {
        case ControlTool.Fog:
        case ControlTool.EreaseFog:
            updateCurrentFogPath()
            setPointerOutline(x, y, 'yellow', settingsState.fogRadius)
            break
        case ControlTool.Draw:
        case ControlTool.EreaseDraw:
            updateCurrentDrawPath()
            setPointerOutline(x, y, settingsState.drawColor, settingsState.drawSize)
            break
        case ControlTool.Move:
            if (e.buttons & 1)
                dragSelectedTokens(e)
            break
        default: break
        }
        if (([ControlTool.Draw, ControlTool.EreaseDraw, ControlTool.Fog, ControlTool.EreaseFog].indexOf(settingsState.tool) >= 0) && (e.buttons & 1)) {
            currentPath.points.push(new Point(x, y))
        }
    }

    /****************************************************
     * React Hooks                                      *
     ****************************************************/
    // On Mount
    useEffect(() => {
        //TODO: reenable keypresses
        //window.addEventListener('keypress', onKeyPress)
        window.addEventListener('keydown', onKeyDown)

        // On Unmount
        return () => {
            //window.removeEventListener('keypress', onKeyPress)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    useEffect(() => {
        if ((metadataState.userType === UserType.player) && (webSocketContext.ws)) {
            loadingContext.startLoadingTask(GAME_REQUEST_REFRESH)
            requestRefresh(webSocketContext.ws, webSocketContext.wsSettings)
        }
    }, [ metadataState.userType, metadataState.userGuid, metadataState.roomGuid ])

    /****************************************************
     * Component Render                                 *
     ****************************************************/
    return (
        <GameView
            userType={ metadataState.userType }
            overlayRef={ overlayRef }
            cursors={ metadataState.cursors }
            tokens={ tokenState.tokens }
            onMouseMove={ onMouseMove }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        tokenState: state.token,
        settingsState: state.settings,
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    updateTokens,
    toggleTokenValue,
    updateMaps,
    setTokenSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent)
