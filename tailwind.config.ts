import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		screens: {
			tablet: '768px',
			desktop: '1200px'
		},
		colors: {
			white: '#ffffff',
			black: '#0000112',
			'gray-100': '#3e3f4e',
			'gray-200': '#2b2c37',
			'gray-300': '#20212c',
			'slate-100': '#f4f7fd',
			'slate-200': '#e4ebfa',
			'slate-300': '#828fa3',
			'violet-100': '#a8a4ff',
			'violet-200': '#635fc7',
			'red-100': '#ff9898',
			'red-200': '#ea5555'
		},
		fontSize: {
			xs: ['0.75rem', { lineHeight: '0.9375rem', fontWeight: 'bold' }],
			sm: ['0.8125rem', { lineHeight: '1.4375rem' }],
			'heading-s': [
				'0.75rem',
				{ lineHeight: '0.9375rem', letterSpacing: '0.15em', fontWeight: 'bold' }
			],
			'heading-m': ['0.9375rem', { lineHeight: '1.25rem', fontWeight: 'bold' }],
			'heading-l': [
				'1.125rem',
				{ lineHeight: '1.4375rem', fontWeight: 'bold' }
			],
			'heading-xl': ['1.5rem', { lineHeight: '1.875rem', fontWeight: 'bold' }]
		},
		extend: {}
	},
	plugins: []
};
export default config;
