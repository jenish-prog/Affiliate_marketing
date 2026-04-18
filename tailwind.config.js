export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E85A22',
          light: '#FFF0EB',
        },
        secondary: {
          DEFAULT: '#1A1A2E',
          soft: '#2D2D4E',
        },
        accent: {
          DEFAULT: '#00D4AA',
          light: '#E6FAF6',
        },
        surface: '#FFFFFF',
        border: '#E8E8EC',
        bg: '#F5F5F7',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        pill: '50px',
      },
    },
  },
  plugins: [],
}
