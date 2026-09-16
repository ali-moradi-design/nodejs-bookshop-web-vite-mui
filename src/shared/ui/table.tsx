import * as React from 'react';
import MuiTable from '@mui/material/Table';
import TableBodyMui from '@mui/material/TableBody';
import TableCellMui from '@mui/material/TableCell';
import TableHeadMui from '@mui/material/TableHead';
import TableRowMui from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { cn } from '@/shared/lib';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <TableContainer className="relative w-full overflow-auto">
      <MuiTable ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </TableContainer>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <TableHeadMui ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <TableBodyMui ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <TableRowMui ref={ref} hover className={cn(className)} {...props} />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, align, ...props }, ref) => (
  <TableCellMui
    ref={ref}
    component="th"
    align={align === 'char' ? undefined : align}
    className={cn('!font-medium text-muted-foreground', className)}
    {...(props as object)}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, align, ...props }, ref) => (
  <TableCellMui
    ref={ref}
    align={align === 'char' ? undefined : align}
    className={cn(className)}
    {...(props as object)}
  />
));
TableCell.displayName = 'TableCell';
