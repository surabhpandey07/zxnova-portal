import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ZXNOVA Branding Colors
        'zxnova': {
          'primary': '#1D3E3E',      // Dark Teal
          'secondary': '#20B2AA',    // Light Sea Green
          'accent': '#3DD9D6',       // Lighter Teal
          'light': '#E8F5F4',        // Very Light Teal
          'dark': '#0D2626',         // Darker Teal
        },
        // Semantic colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'info': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'zxnova': '0 10px 30px rgba(29, 62, 62, 0.15)',
        'zxnova-lg': '0 20px 50px rgba(29, 62, 62, 0.2)',
      },
      backgroundImage: {
        'gradient-zxnova': 'linear-gradient(135deg, #1D3E3E 0%, #20B2AA 100%)',
        'gradient-zxnova-light': 'linear-gradient(135deg, #20B2AA 0%, #3DD9D6 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
