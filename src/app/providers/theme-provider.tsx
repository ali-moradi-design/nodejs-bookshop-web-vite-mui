import { useEffect, useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { usePreferences } from '@/shared/hooks';
import { getPaletteColors } from '@/shared/config';

const ltrCache = createCache({ key: 'mui', prepend: true });
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeName = usePreferences((s) => s.theme);
  const mode = usePreferences((s) => s.mode);
  const locale = usePreferences((s) => s.locale);
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themeName;
    root.classList.toggle('dark', mode === 'dark');
    root.lang = locale;
    root.dir = dir;
  }, [themeName, mode, locale, dir]);

  const muiTheme = useMemo(() => {
    const p = getPaletteColors(themeName, mode);
    return createTheme({
      direction: dir,
      palette: {
        mode,
        primary: { main: p.primary, contrastText: p.primaryContrast },
        secondary: { main: p.secondary, contrastText: p.secondaryContrast },
        error: { main: p.error, contrastText: p.errorContrast },
        background: { default: p.background, paper: p.paper },
        text: { primary: p.text, secondary: p.textSecondary },
        divider: p.divider,
      },
      shape: { borderRadius: 8 },
      typography: {
        fontFamily:
          locale === 'fa'
            ? 'var(--font-vazirmatn), Vazirmatn, Tahoma, sans-serif'
            : 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: { textTransform: 'none' },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: p.background,
              color: p.text,
            },
          },
        },
      },
    });
  }, [themeName, mode, dir, locale]);

  return (
    <CacheProvider value={dir === 'rtl' ? rtlCache : ltrCache}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
