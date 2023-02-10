/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			colors: {
				color: {
					100: '#F34068',
					200: '#006B7F',
					300: '#6FA9B7',
				},
				// Configure your color palette here
			},
		},
	},
	variants: {},
	plugins: [],
};
