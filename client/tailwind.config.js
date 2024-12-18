/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Public Sans"', 'sans-serif'], // Add Public Sans as the default sans font
            },
            colors: {
                'tw-primary': '#93A603', // Customize this color code as your primary color
                base: '#F5F5F9', // Customize this color code as your primary color
                "basecontent": '#384551'
            },
        },
    },
    plugins: [],
};