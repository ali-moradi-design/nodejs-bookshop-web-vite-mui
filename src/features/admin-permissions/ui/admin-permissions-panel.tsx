import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePermissionsQuery, type Permission } from '@/entities/permission';
import { DataTable, Alert, Badge, PageLoader, type DataTableColumn } from '@/shared/ui';
import { ApiError } from '@/shared/api';
import { usePageTitle } from '@/shared/hooks';

export function AdminPermissionsPanel() {
  const { t } = useTranslation();
  usePageTitle(t('nav.permissions'));
  const { data, isLoading, error } = usePermissionsQuery();

  const columns = useMemo<DataTableColumn<Permission>[]>(
    () => [
      { field: 'slug', header: 'Slug' },
      { field: 'name', header: 'Name' },
      {
        field: 'section',
        header: 'Section',
        cell: (row) => <Badge variant="secondary">{row.section}</Badge>,
      },
      { field: 'description', header: 'Description' },
    ],
    [],
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
      <h1 className="text-2xl font-bold">{t('nav.permissions')}</h1>
      <DataTable columns={columns} data={data ?? []} pageSize={15} />
    </div>
  );
}
