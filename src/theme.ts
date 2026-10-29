import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      margin: 0,
      bg: 'cream.50',
      color: 'ink.900',
      fontFamily: 'body',
      lineHeight: 'tall',
    },
    'h1, h2, h3, h4': {
      fontFamily: 'heading',
      color: 'brand.900',
      letterSpacing: '-0.02em',
      lineHeight: '1.15',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Fraunces', Georgia, 'Times New Roman', serif` },
        body: { value: `'Source Sans 3', 'Segoe UI', sans-serif` },
      },
      colors: {
        brand: {
          900: { value: '#0B3022' },
          800: { value: '#0f3d2b' },
          700: { value: '#1A5C3A' },
          600: { value: '#2a7a4f' },
          500: { value: '#3a9460' },
        },
        gold: {
          500: { value: '#C9A227' },
          400: { value: '#E0C15A' },
          600: { value: '#A8841A' },
          700: { value: '#8a6c14' },
        },
        cream: {
          50: { value: '#F7F3E8' },
          100: { value: '#EBE4D4' },
          200: { value: '#ddd4bf' },
        },
        ink: {
          900: { value: '#0F1A14' },
          700: { value: '#3d4f44' },
          500: { value: '#5a6e63' },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: '{colors.cream.50}' },
        fg: { value: '{colors.ink.900}' },
        muted: { value: '{colors.ink.700}' },
        accent: { value: '{colors.gold.500}' },
        surface: { value: 'white' },
        header: { value: '{colors.brand.900}' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
