/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#1B3A6B',
          navyDark: '#0F2A4A',
          navyDeep: '#091D36',
          saffron: '#F5821F',
          saffronHover: '#E06D0B',
          saffronLight: '#FFF5EB',
          green: '#138808',
          greenSoft: '#86C88A',
          greenLight: '#F0FDF4',
          grayText: '#556575',
          borderLight: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(27, 58, 107, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'card-lg': '0 20px 40px -10px rgba(15, 42, 74, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
