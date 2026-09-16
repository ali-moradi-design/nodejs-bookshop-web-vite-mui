# Material UI + AG Grid

## MUI

- App-wide `ThemeProvider` in `src/app/providers/theme-provider.tsx` wraps Emotion `CacheProvider` (LTR/RTL), MUI `createTheme`, and `CssBaseline`.
- Named bookstore themes (`default` / `amethyst` / `terracotta`) × light/dark map to MUI palettes via `shared/config/mui-palette.ts`, while Tailwind CSS variables in `globals.css` stay available for layout utilities.
- `shared/ui` exposes familiar compound APIs (`Dialog`, `Sheet`, `Select`, `DropdownMenu`, …) implemented with MUI primitives so features/pages keep stable imports.

## AG Grid

- `shared/ui/data-table.tsx` uses **AG Grid Community** (`ag-grid-react` + `AllCommunityModule`) with `themeMaterial` params derived from the active MUI palette.
- Admin and panel tables pass `DataTableColumn<T>` (`field` / `header` / `cell`) instead of TanStack `ColumnDef`.
- Manual server pagination is supported (`manualPagination`, `pageCount`, `pagination`, `onPaginationChange`).

## Remaining debt

- Shared UI still accepts many Tailwind `className`s for layout; full MUI `sx`-only styling is not a goal of this migration.
- AG Grid Community bundle is large (~1MB); consider route-level lazy boundaries beyond the existing `admin` / `grid` manual chunks if storefront TTI regresses.
- `BeamsBackground` / `KokonutButton` are decorative leftovers (no Radix).
- Compound Select/Dropdown APIs are compatibility shims — new code may import `@mui/material` directly when a thinner API is clearer.
