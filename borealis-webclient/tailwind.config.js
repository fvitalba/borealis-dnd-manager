// eslint-disable-next-line @typescript-eslint/no-var-requires
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
                'empty-dark': '#111213',
                'text-primary': '#EBEBEC',
                'text-secondary': '#B0B1B3',
                'text-active': '#39D0B2',
                'text-clicked': '#9CE8D9',
                'text-action': '#39D0B2',
                'text-whisper': '#405B87',
                'text-comment': '',
                'text-error': '#FF0000',
                'primary-lighter': '#757679',
                'primary-light': '#4E4F53',
                'primary-medium': '#34353A',
                'primary-dark': '#29292D',
                'primary-darker': '#1D1E20',
                'secondary-lighter': '#8C9DB7',
                'secondary-light': '#667C9F',
                'secondary-medium': '#405B87',
                'secondary-dark': '#2D405F',
                'secondary-darker': '#1A2436',
                'accent-lighter': '#9CE8D9',
                'accent-light': '#61D9C1',
                'accent-medium': '#39D0B2',
                'accent-dark': '#28927D',
                'accent-darker': '#175347',
                'error-dark': '#991B1B',
                'error-darker': '#7F1D1D',
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
            },
            minWidth: {
                '8': '2rem',
            },
            maxWidth: {
                '28': '7rem',
            },
            minHeight: {
                '8': '2rem',
            },
            maxHeight: {
                '28': '7rem',
            }
        },
    },
    plugins: [],
}
