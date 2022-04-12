import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { overwriteGame, updateMaps, loadMap, addMap, setFogEnabled, updateTokens, toggleTokenValue } from '../reducers/gameReducer'
import { addChatMessage, overwriteChat } from '../reducers/chatReducer'
import { updateCursor } from '../reducers/metadataReducer'
import { assignCharacter, assignCharacterToUser, setCharacters, updateCharacter } from '../reducers/characterReducer'
import { pushCursor, pushDrawPath, pushFogPath, pushGameRefresh, pushTokens, requestRefresh, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import GameView from '../views/GameView'

const Game = ({ metadata, game, settings, chat, character, overwriteGame, loadMap, updateMaps, addMap, updateTokens, toggleTokenValue, setFogEnabled, addChatMessage, overwriteChat, setCharacters, assignCharacter, assignCharacterToUser, updateCharacter, updateCursor }) => {
    const overlayRef = React.useRef()
    const [webSocket, wsSettings] = useWebSocket()
    const [_isLoading, setIsLoading] = useLoading()
    let currentPath = []

    /****************************************************
     * Map Functions                                    *
     ****************************************************/
    const getMap = () => {
        if (game.maps.length === 0)
            return undefined
        const currMap = game.maps.filter((map) => map.id === game.mapId)
        return currMap.length > 0 ? currMap[0] : game.maps[0]
    }

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
    const dragSelectedTokens = (e) => {
        if (settings.tool !== 'move')
            return

        const selectedTokens = game.tokens.filter((token) => token.selected)
        if (selectedTokens.length > 0) {
            const newTokens = game.tokens.map((token) => {
                return !token.selected ? token : {
                    ...token,
                    x: token.x + (e.movementX / settings.scale),
                    y: token.y + (e.movementY / settings.scale),
                }
            })
            updateTokens(newTokens)
        }
    }

    /****************************************************
     * Drawing Functions                                *
     ****************************************************/
    const setPointerOutline = (x, y, color, radius) => {
        if (color === null)
            return
        const ctx = overlayRef.current.getContext('2d')
        ctx.strokeStyle = color
        ctx.lineWidth = '3'
        ctx.beginPath()
        ctx.arc(x, y, radius / 1.5, 0, 2*Math.PI)
        ctx.stroke()
        ctx.closePath()
    }

    const updateCurrentDrawPath = () => {
        const ctx = overlayRef.current.getContext('2d')
        ctx.beginPath()
        for (let pointId = 0; pointId < currentPath.length; pointId++) {
            const drawColor = currentTool() === 'draw' ? currentPath[pointId].drawColor : 'black'
            ctx.lineCap = 'round'
            ctx.fillStyle = drawColor
            ctx.lineWidth = currentPath[pointId].drawSize
            ctx.strokeStyle = drawColor
            if (pointId === 0) {
                ctx.moveTo(currentPath[pointId].x, currentPath[pointId].y)
            } else {
                ctx.lineTo(currentPath[pointId].x, currentPath[pointId].y)
            }
        }
        ctx.stroke()
    }

    const updateCurrentFogPath = () => {
        const ctx = overlayRef.current.getContext('2d')
        ctx.beginPath()
        for (let pointId = 0; pointId < currentPath.length; pointId++) {
            ctx.lineCap = 'round'
            ctx.fillStyle = 'white'
            ctx.lineWidth = currentPath[pointId].r
            ctx.strokeStyle = 'white'
            if (pointId === 0) {
                ctx.moveTo(currentPath[pointId].x, currentPath[pointId].y)
            } else {
                ctx.lineTo(currentPath[pointId].x, currentPath[pointId].y)
            }
        }
        ctx.stroke()
    }

    const clearOverlay = () => {
        const ctx = overlayRef.current.getContext('2d')
        if (!ctx)
            return
        ctx.clearRect(0, 0, game.width, game.height)
    }

    /****************************************************
     * Event Handlers                                   *
     ****************************************************/
    /* Callback when the window resizes */
    const onResize = () => {
        //loadMap(null, true, true)
    }

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

    const onMouseUp = (e) => {
        const currMap = getMap()
        if ((currMap) && (currentPath.length > 0)) {
            const scaledCurrPath = currentPath.map((point) => ({
                ...point,
                x: (point.x - settings.deltaX) / settings.scale,
                y: (point.y - settings.deltaY) / settings.scale,
                r: point.r / settings.scale,
            }))
            const fogPaths = currMap.fogPaths
            const drawPaths = currMap.drawPaths
            switch (settings.tool) {
            case 'fog':
                fogPaths.push(scaledCurrPath)
                pushFogPath(webSocket, wsSettings, scaledCurrPath)
                break
            case 'draw':
                drawPaths.push(scaledCurrPath)
                pushDrawPath(webSocket, wsSettings, scaledCurrPath)
                break
            default: break
            }
            currentPath = []
            const updatedMaps = game.maps.map((map) => {
                return map.id === currMap.id ? { ...currMap, fogPaths: fogPaths, drawPaths: drawPaths, } : map
            })

            updateMaps(updatedMaps)
        }

        const selectedTokens = game.tokens.filter((token) => token.selected)
        if (selectedTokens.length > 0) {
            let deselectTokens = false
            for (const x of [document.activeElement, e.target])
                if (x.id.toUpperCase() === 'BACKGROUND')
                    deselectTokens = true
            if (deselectTokens)
                game.tokens.map((token) => token.selected ? toggleTokenValue(token.guid,'selected') : null)

            pushTokens(webSocket, wsSettings, game.tokens)
        }
    }

    const onMouseDown = (e) => {
        const selectedTokens = game.tokens.filter((token) => token.selected)
        if (selectedTokens.length > 0) {
            let deselectTokens = false
            for (const x of [document.activeElement, e.target])
                if (x.className === 'background')
                    deselectTokens = true
            if (deselectTokens)
                game.tokens.map((token) => token.selected ? toggleTokenValue(token.guid,'selected') : null)
        }
        for (const x of [document.activeElement, e.target])
            if ((x.tagName.toUpperCase() === 'INPUT' && (x.type.toUpperCase() === 'TEXT' || x.type.toUpperCase() === 'NUMBER')) || (x.tagName.toUpperCase() === 'BUTTON'))
                return e

        if (e.buttons & 1) {
            currentPath = []
            currentPath.push({
                x: e.pageX,
                y: e.pageY,
                r: settings.fogRadius,
                r2: undefined,
                tool: currentTool(),
                drawColor: settings.drawColor,
                drawSize: settings.drawSize,
            })
        }
    }

    const onMouseMove = (e) => {
        const overlay = overlayRef
        if (!overlay)
            return

        clearOverlay()
        const x = e.pageX, y = e.pageY
        if (settings.shareMouse) {
            pushCursor(webSocket, wsSettings, x, y)
        }
        const currentlySelectedTool = settings.tool
        switch (currentlySelectedTool) {
        case 'fog':
            updateCurrentFogPath()
            setPointerOutline(x, y, 'yellow', settings.fogRadius)
            break
        case 'draw':
            updateCurrentDrawPath()
            setPointerOutline(x, y, settings.drawColor, settings.drawSize)
            break
        case 'move':
            if (e.buttons & 1)
                dragSelectedTokens(e)
            break
        default: break
        }
        if ((currentlySelectedTool === 'fog' || currentlySelectedTool === 'draw') && (e.buttons & 1)) {
            currentPath.push({
                x: x,
                y: y,
                r: settings.fogRadius,
                r2: undefined,
                tool: currentTool(),
                drawColor: settings.drawColor,
                drawSize: settings.drawSize,
            })
        }
    }

    const currentTool = () => {
        const isEraser = settings.subtool === 'eraser'
        switch (settings.tool) {
        case 'draw':
            if (isEraser) {
                return 'erease'
            } else {
                return 'draw'
            }
        default:
            return settings.tool
        }
    }

    /****************************************************
     * Helper Functions                                 *
     ****************************************************/
    /*
    const notify = (msg, ttl, tag) => {
        console.log(msg)
        if (window.Notification) {
            if (window.Notification.permission !== 'granted')
                window.Notification.requestPermission()
            else {
                const note = new window.Notification(msg, { tag: tag })
                setTimeout(() => note.close(), ttl || 1000)
                return note
            }
        }
    }
    */

    function handleError (ex) {
        console.error(ex)
        console.error('Exception in `render`. Clearing localStorage...')
        localStorage.removeItem(metadata.room)
        window.alert('Fatal error. Local storage cleared.')
    }

    /****************************************************
     * React Hooks                                      *
     ****************************************************/
    // On Mount
    useEffect(() => {
        window.addEventListener('resize', onResize)
        //TODO: reenable keypresses
        //window.addEventListener('keypress', onKeyPress)
        window.addEventListener('keydown', onKeyDown)

        // On Unmount
        return () => {
            window.removeEventListener('resize', onResize)
            //window.removeEventListener('keypress', onKeyPress)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    useEffect(() => {
        if (!metadata.isHost && webSocket) {
            setIsLoading(true)
            requestRefresh(webSocket, wsSettings)
        }
    }, [ webSocket, wsSettings, metadata.isHost ])

    /****************************************************
     * Component Render                                 *
     ****************************************************/

    try {
        return (
            <GameView
                isHost={ metadata.isHost }
                overlayRef={ overlayRef }
                cursors={ metadata.cursors }
                tokens={ game.tokens }
                onMouseMove={ onMouseMove }
                onMouseUp={ onMouseUp }
                onMouseDown={ onMouseDown }
                /* TODO: reenable notify={ notify } */
            />
        )
    } catch (ex) {
        handleError(ex)
    }
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata,
        game: state.game,
        settings: state.settings,
        chat: state.chat,
        character: state.character,
    }
}

const mapDispatchToProps = {
    overwriteGame,
    loadMap,
    updateMaps,
    addMap,
    setFogEnabled,
    updateTokens,
    toggleTokenValue,
    addChatMessage,
    overwriteChat,
    setCharacters,
    assignCharacter,
    assignCharacterToUser,
    updateCharacter,
    updateCursor,
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
