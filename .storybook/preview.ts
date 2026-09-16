import type { Preview } from '@storybook/react-vite';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import '../src/app/styles/globals.css';

const cache = createCache({ key: 'mui', prepend: true });
const theme = createTheme({
  palette: {
    primary: { main: '#547578' },
    secondary: { main: '#e7e9e2', contrastText: '#1b1d16' },
    background: { default: '#f0f4f5', paper: '#ffffff' },
  },
  shape: { borderRadius: 8 },
  components: { MuiButton: { styleOverrides: { root: { textTransform: 'none' } } } },
});

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    (Story) =>
      React.createElement(
        CacheProvider,
        { value: cache },
        React.createElement(
          ThemeProvider,
          { theme },
          React.createElement(CssBaseline),
          React.createElement(Story),
        ),
      ),
  ],
};

export default preview;
