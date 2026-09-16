import MuiAlert from '@mui/material/Alert';
import { cn } from '@/shared/lib';

type AlertVariant = 'default' | 'destructive' | 'success';

export const Alert = ({
  className,
  variant = 'default',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }) => {
  const severity = variant === 'destructive' ? 'error' : variant === 'success' ? 'success' : 'info';
  return (
    <MuiAlert severity={severity} className={cn(className)} role="alert" {...(props as object)}>
      {children}
    </MuiAlert>
  );
};
