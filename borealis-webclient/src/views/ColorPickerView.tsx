const colorSelection = [{
    bg: 'bg-violet-600',
    css: '#7c3aed',
},
{
    bg: 'bg-blue-600',
    css: '#2564eb',
},
{
    bg: 'bg-cyan-600',
    css: '#0890b2',
},
{
    bg: 'bg-green-600',
    css: '#16a34a',
},
{
    bg: 'bg-yellow-400',
    css: '#facc15',
},
{
    bg: 'bg-red-600',
    css: '#dc2626',
},
{
    bg: 'bg-neutral-500',
    css: '#737373',
},
{
    bg: 'bg-neutral-50',
    css: '#fafafa',
}]

const ColorPickerView = ({ currentColor, colorPickerRef, colorPickerState, setDrawColor }) => {
    return (
        <div className='color-picker-container' ref={ colorPickerRef } style={{ left: colorPickerState.xPos, top: colorPickerState.yPos, }}>
            { colorSelection.map((color) => {
                return <div key={ color.bg } className={ (currentColor === color.css ? 'color-picker-color-selected ' : 'color-picker-color ')+color.bg } onClick={ () => setDrawColor(color.css) } />
            })
            }
        </div>
    )
}

export default ColorPickerView
