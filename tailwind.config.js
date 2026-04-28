export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E64A19',
          dark: '#D84315',
          light: '#FBE9E7',
        },
        brand: {
          dark: '#1C1F26',
          darker: '#14161A',
          red: '#D32F2F',
          green: '#2E7D32',
          bg: '#F8F9FA',
        },
        surface: '#FFFFFF',
        border: '#EEEEEE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
