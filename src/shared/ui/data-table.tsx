import { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeMaterial,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
  type PaginationChangedEvent,
} from 'ag-grid-community';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

ModuleRegistry.registerModules([AllCommunityModule]);

export type DataTableColumn<T> = {
  id?: string;
  /** Field key for simple text cells */
  field?: keyof T & string;
  header: React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  width?: number;
  flex?: number;
  minWidth?: number;
  sortable?: boolean;
};

export type DataTablePagination = {
  pageIndex: number;
  pageSize: number;
};

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  manualPagination?: boolean;
  pageCount?: number;
  pagination?: DataTablePagination;
  onPaginationChange?: (p: DataTablePagination) => void;
  getRowId?: (row: T) => string;
}

function CellRenderer<T>({
  params,
  column,
}: {
  params: ICellRendererParams<T>;
  column: DataTableColumn<T>;
}) {
  if (!params.data) return null;
  if (column.cell) return <>{column.cell(params.data)}</>;
  if (column.field) {
    const v = params.data[column.field];
    return <>{v == null ? '' : String(v)}</>;
  }
  return null;
}

export function DataTable<T>({
  columns,
  data,
  pageSize = 10,
  manualPagination,
  pageCount,
  pagination,
  onPaginationChange,
  getRowId,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const apiRef = useRef<GridApi<T> | null>(null);

  const gridTheme = useMemo(() => {
    const p = muiTheme.palette;
    return themeMaterial.withParams({
      backgroundColor: p.background.paper,
      foregroundColor: p.text.primary,
      borderColor: p.divider,
      chromeBackgroundColor: p.mode === 'dark' ? p.background.default : p.background.paper,
      headerBackgroundColor: p.mode === 'dark' ? p.background.default : p.action.hover,
      oddRowBackgroundColor: p.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
      selectedRowBackgroundColor: p.action.selected,
      rowHoverColor: p.action.hover,
      fontFamily: muiTheme.typography.fontFamily,
      fontSize: 14,
      headerFontSize: 13,
      borderRadius: muiTheme.shape.borderRadius,
      spacing: 6,
      accentColor: p.primary.main,
    });
  }, [muiTheme]);

  const colDefs = useMemo(
    () =>
      columns.map((col) => {
        const def: ColDef<T> = {
          colId: col.id ?? col.field ?? String(col.header),
          headerName: typeof col.header === 'string' ? col.header : undefined,
          headerComponent: typeof col.header === 'string' ? undefined : () => <>{col.header}</>,
          width: col.width,
          flex: col.flex ?? (col.width ? undefined : 1),
          minWidth: col.minWidth ?? 100,
          sortable: col.sortable ?? false,
          cellRenderer: (params: ICellRendererParams<T>) => (
            <CellRenderer params={params} column={col} />
          ),
        };
        if (col.field) {
          // AG Grid field typing is stricter than keyof T & string
          (def as ColDef).field = col.field;
        }
        return def;
      }),
    [columns],
  );

  const onGridReady = useCallback(
    (e: GridReadyEvent<T>) => {
      apiRef.current = e.api;
      if (pagination) {
        e.api.setGridOption('paginationPageSize', pagination.pageSize);
        e.api.paginationGoToPage(pagination.pageIndex);
      } else {
        e.api.setGridOption('paginationPageSize', pageSize);
      }
    },
    [pagination, pageSize],
  );

  const onPaginationChanged = useCallback(
    (e: PaginationChangedEvent<T>) => {
      if (!manualPagination || !onPaginationChange || !e.api) return;
      onPaginationChange({
        pageIndex: e.api.paginationGetCurrentPage(),
        pageSize: e.api.paginationGetPageSize(),
      });
    },
    [manualPagination, onPaginationChange],
  );

  const currentPage = pagination?.pageIndex ?? 0;
  const totalPages =
    pageCount ?? Math.max(1, Math.ceil(data.length / (pagination?.pageSize ?? pageSize)));

  return (
    <Box className="space-y-3">
      <Box
        className="overflow-hidden rounded-xl border"
        sx={{ borderColor: 'divider', bgcolor: 'background.paper', width: '100%' }}
      >
        <div style={{ width: '100%', height: Math.min(560, 52 + Math.max(data.length, 3) * 48) }}>
          <AgGridReact<T>
            theme={gridTheme}
            rowData={data}
            columnDefs={colDefs}
            pagination={!manualPagination}
            paginationPageSize={pagination?.pageSize ?? pageSize}
            suppressPaginationPanel={Boolean(manualPagination)}
            onGridReady={onGridReady}
            onPaginationChanged={manualPagination ? onPaginationChanged : undefined}
            getRowId={getRowId ? (p) => getRowId(p.data as T) : undefined}
            animateRows
            suppressCellFocus
            domLayout={data.length <= 12 && !manualPagination ? 'autoHeight' : undefined}
            overlayNoRowsTemplate={t('common.empty')}
          />
        </div>
      </Box>
      {manualPagination ? (
        <Box className="flex items-center justify-end gap-2">
          <Button
            size="small"
            variant="outlined"
            disabled={currentPage <= 0}
            onClick={() =>
              onPaginationChange?.({
                pageIndex: currentPage - 1,
                pageSize: pagination?.pageSize ?? pageSize,
              })
            }
          >
            {t('common.previous')}
          </Button>
          <Typography variant="body2" color="text.secondary">
            {t('common.page')} {currentPage + 1}
            {totalPages ? ` ${t('common.of')} ${totalPages}` : ''}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            disabled={currentPage + 1 >= totalPages}
            onClick={() =>
              onPaginationChange?.({
                pageIndex: currentPage + 1,
                pageSize: pagination?.pageSize ?? pageSize,
              })
            }
          >
            {t('common.next')}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
