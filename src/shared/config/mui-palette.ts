import type { ThemeName, ColorMode } from './themes';

export type PaletteColors = {
  primary: string;
  primaryContrast: string;
  secondary: string;
  secondaryContrast: string;
  background: string;
  paper: string;
  text: string;
  textSecondary: string;
  error: string;
  errorContrast: string;
  divider: string;
};

const PALETTES: Record<ThemeName, Record<ColorMode, PaletteColors>> = {
  default: {
    light: {
      primary: '#547578',
      primaryContrast: '#ffffff',
      secondary: '#e7e9e2',
      secondaryContrast: '#1b1d16',
      background: '#f0f4f5',
      paper: '#ffffff',
      text: '#0f1415',
      textSecondary: '#6b725a',
      error: '#c41c0c',
      errorContrast: '#ffffff',
      divider: '#c3d3d5',
    },
    dark: {
      primary: '#5e7b51',
      primaryContrast: '#ffffff',
      secondary: '#2a3a3c',
      secondaryContrast: '#f0f4f5',
      background: '#0f1415',
      paper: '#151d1e',
      text: '#f0f4f5',
      textSecondary: '#9ea58d',
      error: '#f3533c',
      errorContrast: '#ffffff',
      divider: '#2a3a3c',
    },
  },
  amethyst: {
    light: {
      primary: '#5a3066',
      primaryContrast: '#ffffff',
      secondary: '#e2e0ea',
      secondaryContrast: '#16141e',
      background: '#f5eef7',
      paper: '#ffffff',
      text: '#150b18',
      textSecondary: '#595078',
      error: '#c02009',
      errorContrast: '#ffffff',
      divider: '#d5b9dd',
    },
    dark: {
      primary: '#7a418b',
      primaryContrast: '#ffffff',
      secondary: '#3c2044',
      secondaryContrast: '#f5eef7',
      background: '#150b18',
      paper: '#1e1022',
      text: '#f5eef7',
      textSecondary: '#b8a8c8',
      error: '#f3533c',
      errorContrast: '#ffffff',
      divider: '#3c2044',
    },
  },
  terracotta: {
    light: {
      primary: '#c85903',
      primaryContrast: '#ffffff',
      secondary: '#f8efd2',
      secondaryContrast: '#1f1904',
      background: '#fbfce9',
      paper: '#ffffff',
      text: '#1f1f05',
      textSecondary: '#966403',
      error: '#c41c0c',
      errorContrast: '#ffffff',
      divider: '#fdc59b',
    },
    dark: {
      primary: '#c95c03',
      primaryContrast: '#ffffff',
      secondary: '#58460c',
      secondaryContrast: '#fbfce9',
      background: '#1f1904',
      paper: '#2c2306',
      text: '#fbfce9',
      textSecondary: '#ead078',
      error: '#f3533c',
      errorContrast: '#ffffff',
      divider: '#58460c',
    },
  },
};

export function getPaletteColors(theme: ThemeName, mode: ColorMode): PaletteColors {
  return PALETTES[theme][mode];
}
