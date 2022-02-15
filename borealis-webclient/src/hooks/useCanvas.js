import { useRef, useEffect } from 'react'

const useCanvas = (draw, gameState, options={}) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext(options.context || '2d')
		
		draw(context)
	}, [draw]) // eslint-disable-line react-hooks/exhaustive-deps

	return canvasRef
}
export default useCanvas
