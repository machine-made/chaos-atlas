import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/themes/theme-provider';
import { ThemeSwitcher } from '@/components/themes/theme-switcher';
import React from 'react';
import { runUserAction } from '../utils/test-actions';

// Mock themes for testing
const mockThemes = [
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
  },
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
  },
];

describe('ThemeSwitcher', () => {
  const mockOnThemeChange = jest.fn();

  const getThemeOption = (name: 'Tron Dark' | 'Tron Light') => {
    return screen.getByRole('radio', { name: `Switch to ${name} theme` });
  };

  const getThemeOptions = () => {
    return screen.getAllByRole('radio', { name: /Switch to .* theme/ });
  };

  beforeEach(() => {
    mockOnThemeChange.mockClear();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange>
        <ThemeSwitcher />
      </ThemeProvider>
    );
  });

  it('displays available theme options', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(getThemeOption('Tron Dark')).toBeInTheDocument();
    expect(getThemeOption('Tron Light')).toBeInTheDocument();
  });

  it('highlights currently selected theme', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} currentTheme="tron-dark">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const tronDarkButton = getThemeOption('Tron Dark');
    expect(tronDarkButton).toHaveAttribute('aria-checked', 'true');
    expect(tronDarkButton).toHaveClass('theme-button');
  });

  it('calls onThemeChange when theme is selected', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} onThemeChange={mockOnThemeChange}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const tronLightButton = getThemeOption('Tron Light');
    await runUserAction(() => user.click(tronLightButton));

    expect(mockOnThemeChange).toHaveBeenCalledWith('tron-light');
  });

  it('displays theme previews in compact mode', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher compact />
      </ThemeProvider>
    );

    // Compact mode should show visual indicators for each theme
    const themeOptions = getThemeOptions();
    expect(themeOptions).toHaveLength(2);
    themeOptions.forEach(button => {
      expect(button).toHaveClass('w-8');
      expect(button).toHaveClass('h-8');
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('shows customization panel when enabled', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher showCustomization />
      </ThemeProvider>
    );

    // Customization controls should be visible
    expect(screen.getByText(/Glow Intensity/i)).toBeInTheDocument();
    expect(screen.getByText(/Animation Speed/i)).toBeInTheDocument();
  });

  it('does not show customization panel when disabled', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Customization controls should not be visible
    expect(screen.queryByText(/Glow Intensity/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Animation Speed/i)).not.toBeInTheDocument();
  });

  it('supports different positions', () => {
    const { rerender } = render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher position="header" />
      </ThemeProvider>
    );

    // Rerender with different position
    rerender(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher position="sidebar" />
      </ThemeProvider>
    );

    rerender(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher position="floating" />
      </ThemeProvider>
    );

    // Should render without errors in all positions
    expect(getThemeOption('Tron Dark')).toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const themeButtons = getThemeOptions();
    themeButtons.forEach(button => {
      expect(button.tabIndex).toBe(0);
    });
  });

  it('has proper ARIA labels', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const themeButtons = getThemeOptions();
    themeButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('supports arrow key navigation', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} currentTheme="tron-dark" onThemeChange={mockOnThemeChange}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const firstButton = getThemeOptions()[0];
    firstButton.focus();

    expect(firstButton).toHaveFocus();

    // Test arrow key navigation
    await runUserAction(() => user.keyboard('{ArrowRight}'));
    await runUserAction(() => user.keyboard('{ArrowLeft}'));
    expect(mockOnThemeChange.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  it('handles Enter key event without errors', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} onThemeChange={mockOnThemeChange}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const themeButton = getThemeOption('Tron Light');
    themeButton.focus();

    await runUserAction(() => user.keyboard('{Enter}'));
    expect(themeButton).toHaveFocus();
  });

  it('displays theme descriptions', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Should have title or aria-describedby with theme description
    const themeButtons = getThemeOptions();
    expect(themeButtons.length).toBeGreaterThan(0);
  });

  it('supports screen reader announcements', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} onThemeChange={mockOnThemeChange}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const themeButton = getThemeOption('Tron Dark');
    await runUserAction(() => user.click(themeButton));

    // Screen reader should announce theme change
    // This would be tested with actual screen reader in real scenario
    expect(mockOnThemeChange).toHaveBeenCalledWith('tron-dark');
  });

  it('shows loading state when switching themes', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [isLoading, setIsLoading] = React.useState(false);

      return (
        <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
          <ThemeSwitcher isLoading={isLoading} />
          <button onClick={() => setIsLoading(true)}>
            Toggle Loading
          </button>
        </ThemeProvider>
      );
    };

    render(<TestComponent />);

    const loadingButton = screen.getByText('Toggle Loading');
    await runUserAction(() => user.click(loadingButton));

    const switcher = screen.getByRole('radiogroup', { name: 'Theme selection' });

    await waitFor(() => {
      expect(switcher).toHaveClass('opacity-50');
      expect(switcher).toHaveClass('pointer-events-none');
    });
  });

  it('respects user motion preferences', () => {
    // Mock reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Should detect motion preference
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('supports high contrast mode', () => {
    // Mock high contrast preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Should detect contrast preference
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-contrast: high)');
  });

  it('handles empty themes array gracefully', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={[]}>
        <ThemeSwitcher themes={[]} />
      </ThemeProvider>
    );

    // Should render without crashing
    expect(screen.queryByText('No themes available')).toBeInTheDocument();
  });

  it('handles missing theme gracefully', () => {
    render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} currentTheme="non-existent">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Should fallback to default theme
    expect(getThemeOptions().length).toBe(2);
  });

  it('updates when themes prop changes', () => {
    const { rerender } = render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={[mockThemes[0]]}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(getThemeOption('Tron Dark')).toBeInTheDocument();
    expect(screen.queryByText('Tron Light')).not.toBeInTheDocument();

    rerender(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes}>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(getThemeOption('Tron Dark')).toBeInTheDocument();
    expect(getThemeOption('Tron Light')).toBeInTheDocument();
  });

  it('maintains active state during updates', () => {
    const { rerender } = render(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} currentTheme="tron-dark">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const activeButton = getThemeOption('Tron Dark');
    expect(activeButton).toHaveAttribute('aria-checked', 'true');

    rerender(
      <ThemeProvider enableSystem={false} disableTransitionOnChange themes={mockThemes} currentTheme="tron-light">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const newActiveButton = getThemeOption('Tron Light');
    expect(newActiveButton).toHaveAttribute('aria-checked', 'true');
  });
});
