import Divider from '@mui/material/Divider';
import { cn } from '@/shared/lib';

export const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
} & React.HTMLAttributes<HTMLHRElement>) => (
  <Divider
    orientation={orientation}
    flexItem={orientation === 'vertical'}
    role={decorative ? 'none' : 'separator'}
    className={cn(className)}
    {...props}
  />
);
