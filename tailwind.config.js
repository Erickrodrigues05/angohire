/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#D4AF37', // Gold
                    50: '#F9F5E6',
                    100: '#F3EBCC',
                    200: '#E6D799',
                    300: '#DAC366',
                    400: '#D4AF37',
                    500: '#AA8C2C',
                    600: '#806921',
                    700: '#554616',
                    800: '#2B230B',
                    900: '#000000',
                },
                dark: {
                    DEFAULT: '#111827', // Gray 900
                    card: '#1F2937', // Gray 800
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
