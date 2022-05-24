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
                'empty-dark': '#000505',
                'primary-lighter': '#849CC2',
                'primary-light': '#6986B5',
                'primary-medium': '#5171A5',
                'primary-dark': '#435E89',
                'primary-darker': '#364B6D',
                'secondary-lighter': '#E4EAF2',
                'secondary-light': '#D6DFEB',
                'secondary-medium': '#BFCDE0',
                'secondary-dark': '#BACADE',
                'accent-light': '#5AD8BF',
                'accent-medium': '#39D0B2',
                'accent-dark': '#2BB69A',
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
                'chat-panel-roll': '120',
                'banner': '120',
                'loading': '130',
                'notification': '140',
                'debug': '150',
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
            },
            fontFamily: {
                'barbaro': ['Barbaro', 'Serif'],
            }
        },
    },
    plugins: [],
}
