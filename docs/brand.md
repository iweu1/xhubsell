# XHubSell Brand Guidelines

## Overview

XHubSell represents innovation, connectivity, and trust in the marketplace ecosystem. Our brand identity combines modern design principles with the symbolic power of the "X" as a hub of connection and exchange.

## Logo

### Primary Logo

The primary logo consists of a stylized "X" with hub elements, representing connection points and a central marketplace. The design features:

- **Stylized X**: Two intersecting paths forming an "X" shape
- **Hub Nodes**: Circular elements at connection points
- **Center Hub**: A focal point representing the marketplace core
- **Orbiting Elements**: Subtle dots suggesting activity and movement

### Logo Variants

#### Full Logo
- **Primary**: `/brand/logos/logo-primary.svg` (gradient blue)
- **White**: `/brand/logos/logo-white.svg` (for dark backgrounds)
- **Black**: `/brand/logos/logo-black.svg` (for light backgrounds)

#### Icon-Only
- **Primary**: `/brand/icons/icon-primary.svg` (gradient blue)
- **White**: `/brand/icons/icon-white.svg` (for dark backgrounds)
- **Black**: `/brand/icons/icon-black.svg` (for light backgrounds)

### Logo Usage

#### Minimum Size
- **Full Logo**: Minimum 32px height
- **Icon-Only**: Minimum 16px height

#### Clear Space
Maintain clear space equal to the height of the "X" element around the logo on all sides.

#### Do's
- Use the appropriate logo variant for your background
- Maintain proper proportions and aspect ratio
- Ensure adequate contrast and visibility

#### Don'ts
- Stretch, skew, or distort the logo
- Change the colors or proportions
- Add drop shadows or effects
- Use the logo on busy backgrounds without proper contrast

## Color Palette

### Primary Colors
- **Primary Blue**: `#3B82F6` (RGB: 59, 130, 246)
- **Primary Dark**: `#1D4ED8` (RGB: 29, 78, 216)

### Gradient
- **Primary Gradient**: Linear gradient from `#3B82F6` to `#1D4ED8`

### Supporting Colors
- **White**: `#FFFFFF` (for logos on dark backgrounds)
- **Black**: `#000000` (for logos on light backgrounds)
- **Gray Scale**: Use the existing Tailwind CSS gray scale for text and UI elements

## Typography

### Primary Font
- **Font Family**: Inter (Google Fonts)
- **Display**: Used for headings and brand text
- **Body**: Used for paragraph text and UI elements

### Font Hierarchy
- **H1/Brand Name**: 1.25rem (20px) - font-bold
- **H2**: 1.125rem (18px) - font-semibold
- **H3**: 1rem (16px) - font-medium
- **Body**: 0.875rem (14px) - font-normal

## Iconography

### Brand Icons
Use the icon-only logo variant for:
- Mobile navigation
- Favicon
- Social media profiles
- App icons

### System Icons
Continue using Lucide React icons for UI elements to maintain consistency with the existing design system.

## Favicon Implementation

The favicon set includes:
- **favicon.ico**: Multi-size ICO file for legacy browsers
- **favicon-32.png**: 32x32 PNG for modern browsers
- **favicon-16.png**: 16x16 PNG for small contexts
- **apple-touch-icon.png**: 180x180 PNG for iOS devices

## Asset Organization

### Directory Structure
```
/brand/
├── logos/
│   ├── logo-primary.svg
│   ├── logo-white.svg
│   ├── logo-black.svg
│   ├── logo-primary-512.png
│   ├── logo-primary-256.png
│   ├── logo-primary-128.png
│   └── logo-primary-64.png
├── icons/
│   ├── icon-primary.svg
│   ├── icon-white.svg
│   ├── icon-black.svg
│   ├── icon-primary-128.png
│   ├── icon-primary-64.png
│   └── icon-primary-32.png
└── favicons/
    ├── favicon.ico
    ├── favicon-32.png
    ├── favicon-16.png
    └── apple-touch-icon.png
```

### File Formats
- **SVG**: Use for all web applications (scalable, small file size)
- **PNG**: Use for contexts that require raster images
- **ICO**: Use for browser favicon

## Accessibility

### Alt Text Recommendations
- **Logo**: "XHubSell" (simple and descriptive)
- **Icon-only**: "XHubSell logo" (when used without text)

### Contrast Requirements
- Ensure minimum 4.5:1 contrast ratio for normal text
- Ensure minimum 3:1 contrast ratio for large text
- Test logo variants against background colors

## Brand Voice

### Personality
- **Innovative**: Forward-thinking and modern
- **Trustworthy**: Reliable and secure
- **Connected**: Emphasizing community and marketplace
- **Professional**: Clean and approachable

### Tone
- Clear and direct communication
- Helpful and supportive
- Professional yet friendly
- Focus on user benefits

## Implementation Examples

### Header Usage
```jsx
<img 
  src="/brand/icons/icon-primary.svg" 
  alt="XHubSell" 
  className="h-8 w-8"
/>
```

### Footer Usage
```jsx
<img 
  src="/brand/icons/icon-primary.svg" 
  alt="XHubSell" 
  className="h-8 w-8"
/>
```

### Favicon Meta Tags
```jsx
icons: {
  icon: [
    { url: '/brand/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
    { url: '/brand/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { url: '/brand/favicons/favicon.ico', sizes: 'any' }
  ],
  apple: '/brand/favicons/apple-touch-icon.png',
},
```

## Maintenance

### Regular Checks
- Verify all logo assets are loading correctly
- Test favicon display across different browsers
- Ensure proper contrast in different contexts
- Check for proper alt text implementation

### Updates
- When updating logos, maintain the same file structure
- Update all size variants simultaneously
- Test across different devices and browsers
- Update documentation if design principles change

## Contact

For brand-related questions or asset requests, contact the design team or refer to the project maintainers.