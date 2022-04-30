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
                'primary-light': '#C7D2FE',     // indigo-200
                'primary-medium': '#4F46E5',    // indigo-600
                'primary-dark': '#3730A3',      // indigo-800
                'primary-darker': '#312E81',    // indigo-900
                'secondary-lighter': '#FEF3C7', // amber-100
                'secondary-light': '#FDE68A',   // amber-200
                'secondary-medium': '#FCD34D',  // amber-300
                'secondary-dark': '#D97706',    // amber-600
                'accent-light': '#FCA5A5',      // red-300
                'accent-dark': '#DC2626',       // red-600
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
                'heading': [],
            }
        },
    },
    plugins: [],
}
