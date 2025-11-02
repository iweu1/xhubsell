# XHubSell Design System

A comprehensive design system built with Tailwind CSS, React, and TypeScript for the XHubSell marketplace platform.

## 🎨 Design Tokens

### Colors
- **Primary**: `#2563EB` (Blue)
- **Secondary**: `#F97316` (Orange)
- **Status Colors**: Success (Green), Warning (Yellow), Error (Red), Info (Blue)
- **Neutral Grays**: 50-950 scale for consistent grays

### Typography
- **Primary Font**: Inter (for body text)
- **Display Font**: Montserrat (for headings)
- **Font Weights**: 400, 500, 600, 700, 800
- **Font Sizes**: xs (12px) to 9xl (8rem)

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: Consistent spacing scale from 0.5rem to 32rem
- **Container**: Max-width 1400px with responsive padding

### Shadows
- **Soft**: Subtle shadow for cards and hover states
- **Medium**: Standard elevation for floating elements
- **Hard**: Strong shadow for modals and overlays

## 🧩 Components

### UI Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, destructive)
- **Card**: Flexible card layout with header, content, and footer
- **Badge**: Status indicators and labels
- **Input**: Form input with consistent styling
- **Skeleton**: Loading state placeholders
- **Dialog**: Modal dialogs with accessibility
- **Tabs**: Tabbed content organization

### Layout Components
- **AppShell**: Main application layout with header, sidebar, and footer
- **Header**: Navigation header with search, language switcher, and user menu
- **Sidebar**: Collapsible navigation sidebar
- **Footer**: Site footer with links and information
- **Breadcrumbs**: Navigation breadcrumb trail
- **PageHero**: Hero section for pages
- **SectionHeading**: Section headers with title and description

### SEO Components
- **SEOTags**: Meta tags and SEO optimization
- **generateMetadata**: Helper function for Next.js metadata

## 📱 Responsive Design

The design system follows a mobile-first approach with responsive breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🎭 States & Interactions

### Button States
- Default, Hover, Active, Focus, Disabled
- Loading states with skeleton
- Icon-only variants

### Card Interactions
- Hover effects with shadow transitions
- Focus states for accessibility
- Loading skeleton states

### Form States
- Focus, error, disabled states
- Validation feedback
- Accessible labels and descriptions

## 🚀 Getting Started

### Installation
```bash
npm install @xhubsell/design-system
```

### Usage
```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## 🎯 Customization

### Extending the Theme
The Tailwind config is designed to be extensible. You can add custom colors, spacing, and components while maintaining consistency.

### Component Variants
Most components use `class-variance-authority` for variant management, making it easy to add new variants without breaking existing ones.

## 📖 Documentation

### Storybook
Run the Storybook to explore components:
```bash
npm run storybook
```

### Design System Demo
Visit `/design-system` to see the complete design system in action.

## 🧪 Testing

Components are designed with accessibility in mind and include:
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## 🔄 Contributing

When adding new components:
1. Follow the established patterns
2. Add TypeScript types
3. Include accessibility attributes
4. Create Storybook stories
5. Update documentation

## 📋 Guidelines

### Naming Conventions
- Components: PascalCase (e.g., `Button`, `CardHeader`)
- Variants: kebab-case in CSS, camelCase in TypeScript
- Colors: semantic names (primary, secondary, status-*)
- Spacing: Tailwind's spacing scale

### File Structure
```
src/components/
├── ui/              # Basic UI components
├── layout/          # Layout components
├── seo/             # SEO components
├── examples/        # Example implementations
└── index.ts         # Component exports
```

## 🎨 Design Principles

1. **Consistency**: Unified visual language across all components
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Performance**: Optimized for speed and perceived performance
4. **Scalability**: Components work at any size and screen density
5. **Maintainability**: Clean code with comprehensive documentation

## 🔧 Tech Stack

- **Tailwind CSS**: Utility-first CSS framework
- **React**: Component library
- **TypeScript**: Type safety
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **Storybook**: Component documentation and testing