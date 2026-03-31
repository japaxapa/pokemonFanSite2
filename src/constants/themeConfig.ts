import type { CSSProperties } from 'react'

/**
 * Theme configuration using Radix UI CSS variables
 * Radix UI automatically provides CSS variables that adapt to light/dark themes
 *
 * Color scale: 1-12 (1=lightest, 12=darkest)
 * In light theme: use higher numbers (9-12)
 * In dark theme: CSS variables automatically adjust
 *
 * Available colors: blue, red, green, yellow, orange, purple, pink, etc.
 * Reference: https://www.radix-ui.com/colors
 */

type ThemeColors = {
  // Primary Colors
  primary: string
  primaryDark: string
  primaryLight: string

  // Background Colors
  background: string
  backgroundSecondary: string
  backgroundTertiary: string

  // Text Colors
  text: string
  textSecondary: string
  textInverted: string

  // Border Colors
  border: string
  borderLight: string
  borderDark: string

  // Component Specific
  buttonBackground: string
  buttonText: string
  buttonHover: string
  activeButtonBackground: string
  activeButtonText: string

  // Shadows
  shadow: string
  shadowHover: string

  // Cards
  cardBackground: string
  cardBorder: string

  // Other
  accent: string
  success: string
  warning: string
  error: string
}

/**
 * Using Radix UI CSS variables - these automatically adjust for light/dark themes
 * No need for different configurations per theme!
 */
export const themeConfig: ThemeColors = {
  // Primary Colors
  primary: 'var(--blue-9)',
  primaryDark: 'var(--blue-11)',
  primaryLight: 'var(--blue-2)',

  // Background Colors
  background: 'var(--gray-1)',
  backgroundSecondary: 'var(--gray-2)',
  backgroundTertiary: 'var(--gray-3)',

  // Text Colors
  text: 'var(--gray-11)',
  textSecondary: 'var(--gray-10)',
  textInverted: 'var(--gray-1)',

  // Border Colors
  border: 'var(--gray-6)',
  borderLight: 'var(--gray-4)',
  borderDark: 'var(--gray-8)',

  // Component Specific
  buttonBackground: 'transparent',
  buttonText: 'var(--gray-11)',
  buttonHover: 'var(--gray-3)',
  activeButtonBackground: 'var(--blue-9)',
  activeButtonText: 'var(--gray-1)',

  // Shadows
  shadow:
    '0px 2px 4px rgba(var(--color-panel-rgb), 0.1), 0px 6px 12px rgba(var(--color-panel-rgb), 0.15)',
  shadowHover:
    '0px 4px 8px rgba(var(--color-panel-rgb), 0.15), 0px 10px 20px rgba(var(--color-panel-rgb), 0.2)',

  // Cards
  cardBackground: 'var(--gray-1)',
  cardBorder: 'var(--gray-6)',

  // Other
  accent: 'var(--amber-9)',
  success: 'var(--green-9)',
  warning: 'var(--orange-9)',
  error: 'var(--red-9)',
}

// Helper function to get theme config based on theme
export const getThemeConfig = (theme: 'light' | 'dark'): ThemeColors => {
  const isLight = theme === 'light'

  return {
    // Primary Colors
    primary: isLight ? 'var(--blue-9)' : 'var(--blue-8)',
    primaryDark: isLight ? 'var(--blue-11)' : 'var(--blue-10)',
    primaryLight: isLight ? 'var(--blue-2)' : 'var(--blue-3)',

    // Background Colors
    background: isLight ? 'var(--gray-1)' : 'var(--gray-2)',
    backgroundSecondary: isLight ? 'var(--gray-2)' : 'var(--gray-3)',
    backgroundTertiary: isLight ? 'var(--gray-3)' : 'var(--gray-4)',

    // Text Colors
    text: isLight ? 'var(--gray-11)' : 'var(--gray-12)',
    textSecondary: isLight ? 'var(--gray-10)' : 'var(--gray-11)',
    textInverted: isLight ? 'var(--gray-1)' : 'var(--gray-12)',

    // Border Colors
    border: isLight ? 'var(--gray-6)' : 'var(--gray-7)',
    borderLight: isLight ? 'var(--gray-4)' : 'var(--gray-5)',
    borderDark: isLight ? 'var(--gray-8)' : 'var(--gray-9)',

    // Component Specific
    buttonBackground: isLight ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
    buttonText: isLight ? 'var(--gray-11)' : 'var(--gray-12)',
    buttonHover: isLight ? 'var(--gray-3)' : 'var(--gray-5)',
    activeButtonBackground: isLight ? 'var(--blue-9)' : 'var(--blue-8)',
    activeButtonText: isLight ? 'var(--gray-1)' : 'var(--gray-1)',

    // Shadows
    shadow: isLight
      ? '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.15)'
      : '0px 2px 4px rgba(240, 240, 240, 0.3), 0px 6px 12px rgba(240, 240, 240, 0.4)',
    shadowHover: isLight
      ? '0px 4px 8px rgba(0, 0, 0, 0.15), 0px 10px 20px rgba(0, 0, 0, 0.2)'
      : '0px 4px 8px rgba(240, 240, 240, 0.4), 0px 10px 20px rgba(240, 240, 240, 0.5)',

    // Cards
    cardBackground: isLight ? 'var(--gray-1)' : 'var(--gray-2)',
    cardBorder: isLight ? 'var(--gray-6)' : 'var(--gray-7)',

    // Other
    accent: isLight ? 'var(--amber-9)' : 'var(--amber-8)',
    success: isLight ? 'var(--green-9)' : 'var(--green-8)',
    warning: isLight ? 'var(--orange-9)' : 'var(--orange-8)',
    error: isLight ? 'var(--red-9)' : 'var(--red-8)',
  }
}

// Example style sets for common components
export const getComponentStyles = (theme: 'light' | 'dark') => {
  const config = getThemeConfig(theme)
  const isLight = theme === 'light'

  return {
    button: {
      height: '100%',
      flex: '1',
      borderRadius: '2rem',
      background: config.buttonBackground,
      color: config.buttonText,
      border: `1px solid ${config.border}`,
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: isLight
        ? `rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px`
        : `rgba(240, 240, 240, 0.5) 0px 3px 6px, rgba(240, 240, 240, 0.6) 0px 3px 6px`,
    } as CSSProperties,

    activeButton: {
      height: '100%',
      flex: '1',
      borderRadius: '2rem',
      background: config.activeButtonBackground,
      color: config.activeButtonText,
      border: `1px solid ${config.primary}`,
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: isLight
        ? `rgb(50, 60, 80) 3px 3px 6px 0px inset, rgba(0, 0, 0, 0.5) -3px -3px 6px 1px inset`
        : `rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset`,
    } as CSSProperties,

    card: {
      background: config.cardBackground,
      border: `1px solid ${config.cardBorder}`,
      borderRadius: '0.5rem',
      boxShadow: config.shadow,
      padding: '1rem',
    } as CSSProperties,

    input: {
      background: config.background,
      color: config.text,
      border: `1px solid ${config.border}`,
      borderRadius: '0.5rem',
      padding: '0.5rem',
    } as CSSProperties,
  }
}
