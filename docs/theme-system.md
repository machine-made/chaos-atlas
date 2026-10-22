# Tron Theme System Documentation

## Overview

The Tron Theme System is a comprehensive, accessible, and performant theming solution built with Test-Driven Development (TDD) methodology. It provides a vintage Tron aesthetic with modern web standards, featuring neon glow effects, dynamic theme switching, and WCAG AA accessibility compliance.

## Features

- ✅ **Vintage Tron Aesthetic**: Authentic color palette (Cyan #00ffff, Orange #ff7f00, Magenta #ff00ff, Yellow #ffff00)
- ✅ **Neon Glow Effects**: Dynamic intensity controls and smooth animations
- ✅ **Theme Persistence**: Automatic localStorage integration with graceful fallbacks
- ✅ **System Theme Detection**: Automatic dark/light mode detection and switching
- ✅ **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- ✅ **Performance Optimized**: Memoized components and efficient re-renders (60fps animations)
- ✅ **Error Handling**: Comprehensive validation and graceful degradation
- ✅ **GitHub Pages Ready**: Static export compatible with optimized bundle size

## Quick Start

### Installation

The theme system is already integrated into the Chaos Atlas application. No additional installation required.

### Basic Usage

```tsx
import { ThemeProvider, ThemeSwitcher, NeonButton } from '@/components/themes';

function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeSwitcher />
        <NeonButton variant="primary">Experience Tron!</NeonButton>
      </div>
    </ThemeProvider>
  );
}
```

## Components

### ThemeProvider

The root component that provides theme context to the entire application.

```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  themes?: ThemeConfiguration[];
  defaultTheme?: string;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  currentTheme?: string; // For controlled usage
  onThemeChange?: (theme: string) => void;
  isLoading?: boolean;
}
```

**Props:**
- `children`: React components that will receive theme context
- `themes`: Array of theme configurations (defaults to Tron themes)
- `defaultTheme`: Default theme ID (defaults to 'tron-dark')
- `storageKey`: localStorage key for persistence (defaults to 'cml-theme')
- `enableSystem`: Enable system theme detection (defaults to true)
- `disableTransitionOnChange`: Disable theme transition animations (defaults to false)
- `currentTheme`: Controlled theme state
- `onThemeChange`: Callback when theme changes
- `isLoading`: Show loading state

**Example:**

```tsx
<ThemeProvider
  themes={customThemes}
  defaultTheme="tron-light"
  enableSystem={true}
  onThemeChange={(theme) => console.log('Theme changed to:', theme)}
>
  <App />
</ThemeProvider>
```

### ThemeSwitcher

Interactive component for switching between themes with multiple display modes.

```tsx
interface ThemeSwitcherProps {
  themes?: ThemeConfiguration[];
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  showCustomization?: boolean;
  compact?: boolean;
  position?: 'header' | 'sidebar' | 'floating';
  isLoading?: boolean;
  className?: string;
}
```

**Props:**
- `themes`: Available themes to display
- `currentTheme`: Currently selected theme
- `onThemeChange`: Theme change callback
- `showCustomization`: Show glow intensity and animation speed controls
- `compact`: Compact display mode
- `position`: Layout position (header, sidebar, floating)
- `isLoading`: Show loading state
- `className`: Additional CSS classes

**Variants:**

```tsx
// Standard theme switcher with customization
<ThemeSwitcher showCustomization />

// Compact mode for tight spaces
<ThemeSwitcher compact />

// Sidebar layout
<ThemeSwitcher position="sidebar" />

// Floating overlay
<FloatingThemeSwitcher />
```

### NeonButton

Tron-styled button component with neon glow effects and comprehensive state management.

```tsx
interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  glowIntensity?: number;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}
```

**Props:**
- `children`: Button content
- `variant`: Color variant (primary, secondary, tertiary, ghost)
- `size`: Button size (sm, md, lg)
- `disabled`: Disable button interaction
- `loading`: Show loading spinner
- `gllowIntensity`: Custom glow intensity (0-1)
- `className`: Additional CSS classes
- Standard HTML button attributes

**Examples:**

```tsx
// Basic variants
<NeonButton variant="primary">Primary Action</NeonButton>
<NeonButton variant="secondary">Secondary Action</NeonButton>
<NeonButton variant="tertiary">Tertiary Action</NeonButton>
<NeonButton variant="ghost">Ghost Action</NeonButton>

// Different sizes
<NeonButton size="sm">Small</NeonButton>
<NeonButton size="md">Medium</NeonButton>
<NeonButton size="lg">Large</NeonButton>

// States
<NeonButton disabled>Disabled</NeonButton>
<NeonButton loading>Loading</NeonButton>

// Custom glow
<NeonButton glowIntensity={0.5}>Subtle Glow</NeonButton>
<NeonButton glowIntensity={1.0}>Intense Glow</NeonButton>
```

## Hooks

### useTheme

Access theme context and controls within any component.

```tsx
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  systemTheme?: string;
  themes: ThemeConfiguration[];
  resolvedTheme: string;
  isTransitioning: boolean;
}
```

**Example:**

```tsx
import { useTheme } from '@/components/themes';

function MyComponent() {
  const { theme, setTheme, themes, isTransitioning } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('tron-light')}>
        Switch to Light
      </button>
      {isTransitioning && <p>Transitioning...</p>}
    </div>
  );
}
```

## Theme Configuration

### Structure

```tsx
interface ThemeConfiguration {
  themeId: string;
  name: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    tertiary: string;
    warning: string;
    text: string;
    textSecondary: string;
    border: string;
    glow: string;
  };
  glow: {
    intensity: number;
    blurRadius: string;
    spreadRadius: string;
  };
  animation: {
    duration: string;
    easing: string;
    reducedMotion: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedGlow: boolean;
  };
}
```

### Default Themes

**Tron Dark:**
```tsx
{
  themeId: 'tron-dark',
  name: 'Tron Dark',
  colors: {
    background: '#000000',
    primary: '#00ffff',
    secondary: '#ff7f00',
    tertiary: '#ff00ff',
    warning: '#ffff00',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#333333',
    glow: '#00ffff',
  },
  glow: { intensity: 0.8, blurRadius: '8px', spreadRadius: '2px' },
  animation: { duration: '0.3s', easing: 'ease-out', reducedMotion: false },
  accessibility: { highContrast: false, reducedGlow: false },
}
```

**Tron Light:**
```tsx
{
  themeId: 'tron-light',
  name: 'Tron Light',
  colors: {
    background: '#0a0a0a',
    primary: '#40ffff',
    secondary: '#ff9f20',
    tertiary: '#ff40ff',
    warning: '#ffff40',
    text: '#ffffff',
    textSecondary: '#dddddd',
    border: '#555555',
    glow: '#40ffff',
  },
  glow: { intensity: 0.6, blurRadius: '6px', spreadRadius: '1px' },
  animation: { duration: '0.2s', easing: 'ease-out', reducedMotion: false },
  accessibility: { highContrast: false, reducedGlow: false },
}
```

## Custom Themes

### Creating Custom Themes

```tsx
import { createTheme, useTheme } from '@/components/themes';

const customTheme = {
  themeId: 'custom-neon',
  name: 'Custom Neon',
  colors: {
    background: '#0a0a1a',
    primary: '#00ff88',
    secondary: '#ff00aa',
    tertiary: '#00aaff',
    warning: '#ffaa00',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#444466',
    glow: '#00ff88',
  },
  glow: { intensity: 0.9, blurRadius: '10px', spreadRadius: '3px' },
  animation: { duration: '0.25s', easing: 'ease-out', reducedMotion: false },
  accessibility: { highContrast: false, reducedGlow: false },
};

// Use custom theme
<ThemeProvider themes={[customTheme, ...defaultThemes]}>
  <App />
</ThemeProvider>
```

### Theme Validation

The theme system includes comprehensive validation and sanitization:

```tsx
import { sanitizeTheme, isValidThemeColors } from '@/components/themes';

// Validate individual theme
const validTheme = sanitizeTheme(customTheme);

// Check if colors are valid
const hasValidColors = isValidThemeColors(theme.colors);
```

## Accessibility

### Features

- **WCAG AA Compliance**: All color combinations meet contrast ratio requirements
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space, and Arrow keys
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Supports high contrast mode preferences
- **Focus Management**: Visible focus indicators and logical tab order

### Testing

The theme system includes comprehensive accessibility tests:

```bash
# Run accessibility tests
npm run test -- tests/accessibility/

# Check contrast ratios
npm run test -- --testNamePattern="contrast ratio"
```

## Performance

### Optimizations

- **React.memo**: Components are memoized to prevent unnecessary re-renders
- **useCallback**: Event handlers are properly memoized
- **Debouncing**: Theme switching is debounced to prevent rapid updates
- **CSS Custom Properties**: Efficient theme updates without re-rendering entire DOM
- **Tree Shaking**: Unused theme utilities are removed from production bundle

### Performance Metrics

- **Initial Render**: < 100ms for theme system initialization
- **Theme Switching**: < 50ms for complete theme transition
- **Memory Usage**: < 10MB increase for full theme system
- **Bundle Size**: < 15KB gzipped for complete theme system
- **60fps Animations**: Smooth transitions and glow effects

### Performance Testing

```bash
# Run performance tests
npm run test -- tests/performance/

# Bundle size analysis
npm run build
npm run analyze  # If bundle analyzer is configured
```

## Error Handling

### Graceful Degradation

The theme system handles errors gracefully:

- **Invalid Themes**: Falls back to default themes
- **localStorage Errors**: Continues operation without persistence
- **CSS Property Errors**: Maintains functionality with partial styling
- **Network Errors**: Works offline after initial load

### Error Recovery

```tsx
// Theme system automatically recovers from errors
const fallbackTheme = {
  themeId: 'fallback',
  name: 'Fallback Theme',
  // ... minimal theme configuration
};

// Automatic fallback is built into ThemeProvider
<ThemeProvider>
  <App /> {/* Will continue working even with theme errors */}
</ThemeProvider>
```

## Testing

### Test Suite Coverage

The theme system includes 140+ tests covering:

- **Unit Tests**: Component contracts and behavior
- **Integration Tests**: Component interaction and state management
- **Visual Tests**: Consistency and regression testing
- **Accessibility Tests**: WCAG compliance and keyboard navigation
- **Performance Tests**: Render times and memory usage
- **Error Handling Tests**: Edge cases and recovery scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm test -- tests/unit/
npm test -- tests/integration/
npm test -- tests/accessibility/
npm test -- tests/performance/
```

### Test Structure

```
tests/
├── unit/                    # Component unit tests
│   ├── theme-provider.test.tsx
│   ├── theme-switcher.test.tsx
│   └── neon-button.test.tsx
├── integration/             # Integration tests
│   └── theme-switching.test.tsx
├── visual/                  # Visual regression tests
│   └── theme-visual.test.tsx
├── accessibility/           # Accessibility tests
│   └── theme-a11y.test.tsx
├── performance/             # Performance tests
│   └── theme-performance.test.tsx
└── error-handling/          # Error handling tests
    └── theme-errors.test.tsx
```

## CSS Architecture

### Custom Properties

The theme system uses CSS custom properties for dynamic theming:

```css
/* Applied to document root */
--tron-background: #000000;
--tron-primary: #00ffff;
--tron-secondary: #ff7f00;
--tron-tertiary: #ff00ff;
--tron-warning: #ffff00;
--tron-text: #ffffff;
--tron-text-secondary: #cccccc;
--tron-border: #333333;
--tron-glow: #00ffff;

/* Dynamic properties */
--tron-glow-intensity: 0.8;
--tron-glow-blur-radius: 8px;
--tron-glow-spread-radius: 2px;
--tron-animation-duration: 0.3s;
--tron-animation-easing: ease-out;
```

### Animation Classes

```css
/* Neon glow effects */
.neon-glow-cyan {
  box-shadow: var(--tron-glow-cyan);
}

.neon-text-cyan {
  text-shadow: var(--tron-glow-cyan);
}

/* Animations */
.neon-pulse {
  animation: neon-pulse 2s ease-in-out infinite;
}

.neon-breathe {
  animation: neon-breathe 4s ease-in-out infinite;
}
```

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

### Progressive Enhancement

The theme system uses progressive enhancement:

- **Basic Functionality**: Works in all modern browsers
- **Enhanced Features**: CSS animations and effects in supported browsers
- **Fallbacks**: Graceful degradation for older browsers

## Deployment

### GitHub Pages

The theme system is optimized for GitHub Pages deployment:

```bash
# Build for GitHub Pages
npm run build

# Output is ready for deployment
# Files are in /out directory
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_THEME_DEFAULT=tron-dark
NEXT_PUBLIC_THEME_STORAGE_KEY=cml-theme
```

### Build Optimization

- **Static Export**: Configured for static site generation
- **CSS Optimization**: Minified and purged CSS
- **Bundle Splitting**: Optimized JavaScript chunks
- **Image Optimization**: Static image handling

## Contributing

### Development

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Lint code
npm run lint
```

### Adding New Themes

1. Create theme configuration following the `ThemeConfiguration` interface
2. Add theme to default themes array in `theme-utils.ts`
3. Write tests for new theme
4. Update documentation
5. Verify accessibility compliance

### Code Style

- Use TypeScript for all new code
- Follow TDD methodology (write tests first)
- Ensure WCAG AA accessibility compliance
- Test performance impact
- Document new features

## Troubleshooting

### Common Issues

**Theme not applying:**
- Check if ThemeProvider wraps your component
- Verify theme configuration format
- Check browser console for errors

**Performance issues:**
- Ensure components are wrapped in React.memo
- Check for unnecessary re-renders
- Verify CSS custom property usage

**Accessibility issues:**
- Test with keyboard navigation
- Verify screen reader announcements
- Check color contrast ratios

**Build errors:**
- Verify all imports are correct
- Check TypeScript types
- Ensure CSS imports are valid

### Debug Tools

```tsx
// Enable debug mode
const debugTheme = {
  ...theme,
  debug: true
};

// Check current theme
const { theme, themes } = useTheme();
console.log('Current theme:', theme);
console.log('Available themes:', themes);
```

## Support

For issues and questions:

1. Check this documentation
2. Review test files for usage examples
3. Check GitHub Issues
4. Create detailed bug reports with reproduction steps

---

*Built with Test-Driven Development • WCAG AA Compliant • Performance Optimized*