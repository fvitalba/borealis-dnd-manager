import { useRef, useEffect } from 'react'

const useCanvas = (draw: (arg0: CanvasRenderingContext2D) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext('2d')

            if (context)
                draw(context)
        }
    }, [draw])

    return canvasRef
}
export default useCanvas
