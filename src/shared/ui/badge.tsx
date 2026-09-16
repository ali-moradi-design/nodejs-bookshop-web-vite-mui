import Chip from '@mui/material/Chip';
import { cn } from '@/shared/lib';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const map: Record<
  BadgeVariant,
  {
    color: 'primary' | 'secondary' | 'error' | 'success' | 'default';
    variant: 'filled' | 'outlined';
  }
> = {
  default: { color: 'primary', variant: 'filled' },
  secondary: { color: 'secondary', variant: 'filled' },
  outline: { color: 'default', variant: 'outlined' },
  destructive: { color: 'error', variant: 'filled' },
  success: { color: 'success', variant: 'filled' },
};

export const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  const m = map[variant];
  return (
    <Chip
      size="small"
      color={m.color}
      variant={m.variant}
      label={children}
      className={cn('!h-6 !text-xs font-semibold', className)}
      component="div"
      {...(props as object)}
    />
  );
};
