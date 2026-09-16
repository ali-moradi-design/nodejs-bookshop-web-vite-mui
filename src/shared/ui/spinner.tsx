import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { cn } from '@/shared/lib';

export const Spinner = ({ className }: { className?: string }) => (
  <CircularProgress size={20} className={cn('text-muted-foreground', className)} />
);

export const PageLoader = () => (
  <Box className="flex min-h-[40vh] items-center justify-center">
    <CircularProgress size={32} />
  </Box>
);
