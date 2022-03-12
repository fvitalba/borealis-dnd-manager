const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',  // if parent item has class "dark" it will automatically apply any properties that include "dark:"-prefix
    theme: {
        extend: {
            colors: {
                primary: colors.gray,    // it's now possible to use bg-primary instead of colors   gray-300
                secondary: colors.sky,
                accent: colors.orange,
            },
            zIndex: {
                'map': '1',
                'drawing': '2',
                'npc-div': '15',
                'npc-lbl': '16',
                'fog-placeholder': '19',
                'fog': '20',
                'pc-div': '25',
                'pc-lbl': '26',
                'overlay': '30',
                'indicator': '30',
                'cursors': '40',
                'control-panel': '100',
                'chat-panel': '110',
                'loading': '120',
            },
            animation: {
                'reverse-spin': 'reverse-spin 1s linear infinite',
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)'
                    },
                }
            }
        },
    },
    plugins: [],
}
