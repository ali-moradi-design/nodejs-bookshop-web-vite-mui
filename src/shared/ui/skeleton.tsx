import MuiSkeleton from '@mui/material/Skeleton';
import { cn } from '@/shared/lib';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <MuiSkeleton variant="rounded" className={cn('bg-muted', className)} {...(props as object)} />
);
