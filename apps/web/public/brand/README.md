# Brand Assets

This directory contains all brand assets for XHubSell.

## Quick Reference

### Logo Files
- **Primary Logo**: `/brand/logos/logo-primary.svg`
- **White Logo**: `/brand/logos/logo-white.svg`
- **Black Logo**: `/brand/logos/logo-black.svg`

### Icon Files
- **Primary Icon**: `/brand/icons/icon-primary.svg`
- **White Icon**: `/brand/icons/icon-white.svg`
- **Black Icon**: `/brand/icons/icon-black.svg`

### Favicon Files
- **Main Favicon**: `/brand/favicons/favicon.ico`
- **32px PNG**: `/brand/favicons/favicon-32.png`
- **16px PNG**: `/brand/favicons/favicon-16.png`
- **Apple Touch**: `/brand/favicons/apple-touch-icon.png`

## Usage

### React Components
```jsx
// Header/Footer Logo
<img 
  src="/brand/icons/icon-primary.svg" 
  alt="XHubSell" 
  className="h-8 w-8"
/>
```

### Next.js Metadata
```jsx
// layout.tsx
icons: {
  icon: [
    { url: '/brand/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
    { url: '/brand/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { url: '/brand/favicons/favicon.ico', sizes: 'any' }
  ],
  apple: '/brand/favicons/apple-touch-icon.png',
},
```

## File Sizes
- SVG files are optimized for web use
- PNG files available in multiple sizes for different contexts
- All assets maintain aspect ratio and quality

For detailed brand guidelines, see `/docs/brand.md`.