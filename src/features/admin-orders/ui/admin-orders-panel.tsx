import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrdersQuery, ORDER_STATUSES, type Order, type OrderStatus } from '@/entities/order';
import { DataTable, type DataTableColumn } from '@/shared/ui';
import { formatMoney, formatDate } from '@/shared/lib';
import { usePreferences } from '@/shared/hooks';
import { ApiError } from '@/shared/api';
import {
  Alert,
  Badge,
  PageLoader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useUpdateOrderStatusMutation } from '../model/use-update-order-status-mutation';

export function AdminOrdersPanel() {
  const { t } = useTranslation();
  const locale = usePreferences((s) => s.locale);
  const { data, isLoading, error } = useOrdersQuery();
  const update = useUpdateOrderStatusMutation();

  const columns = useMemo<DataTableColumn<Order>[]>(
    () => [
      {
        field: 'id',
        header: 'ID',
        cell: (row) => <span className="font-mono text-xs">{row.id.slice(-10)}</span>,
      },
      {
        field: 'status',
        header: t('common.status'),
        cell: (row) => (
          <Select
            value={row.status}
            onValueChange={(v) => update.mutate({ id: row.id, status: v as OrderStatus })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        field: 'payment',
        header: 'Payment',
        cell: (row) => <Badge variant="outline">{row.payment.status}</Badge>,
      },
      {
        field: 'totalAmount',
        header: 'Total',
        cell: (row) => formatMoney(row.totalAmount, 'USD', locale),
      },
      {
        field: 'createdAt',
        header: 'Created',
        cell: (row) => formatDate(row.createdAt, locale),
      },
    ],
    [t, locale, update],
  );

  if (isLoading) return <PageLoader />;
  if (error) {
    return (
      <Alert variant="destructive">
        {error instanceof ApiError ? error.message : t('common.error')}
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('admin.manageOrders')}</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
