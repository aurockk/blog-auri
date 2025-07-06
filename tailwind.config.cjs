/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,md,mdx,ts}'],
	theme: {
		extend: {
			colors: {
				white: '#f8f9fa',
				rosepine: {
					base: '#191724',
					surface: '#1f1d2e',
					overlay: '#26233a',
					muted: '#6e6a86',
					subtle: '#908caa',
					text: '#e0def4',
					love: '#eb6f92',
					gold: '#f6c177',
					rose: '#ebbcba',
					pine: '#31748f',
					foam: '#9ccfd8',
					iris: '#c4a7e7',
					highlightLow: '#21202e',
					highlightMed: '#403d52',
					highlightHigh: '#524f67'
				}
			},
			fontFamily: {
				body: ['Manrope', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateColumns: {
				list: 'repeat(auto-fill, minmax(400px, max-content))'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
