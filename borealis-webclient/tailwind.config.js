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
            },
            zIndex: {
                '100': '100',
                '110': '110',
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
