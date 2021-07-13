import { useRef, useEffect } from 'react'

const useCanvas = (draw, gameState, options={}) => {
	const canvasRef = useRef(null)

	useEffect(() => {	
		const canvas = canvasRef.current
		const context = canvas.getContext(options.context || '2d')
		
		draw(context)
			.then({
				// do nothing
			})
			.catch((err) => {
				console.error('error in draw', err)
			})
	}, [draw])

	return canvasRef
}
export default useCanvas
