import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { cn } from '@/shared/lib';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ title, description, action, className, icon }: EmptyStateProps) => (
  <Box
    className={cn(
      'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 px-6 py-12 text-center',
      className,
    )}
  >
    {icon}
    <div className="space-y-1">
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" className="max-w-sm">
          {description}
        </Typography>
      ) : null}
    </div>
    {action}
  </Box>
);
