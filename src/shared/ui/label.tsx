import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import { cn } from '@/shared/lib';

export const Label = React.forwardRef<
  HTMLLabelElement,
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'color'>
>(({ className, ...props }, ref) => (
  <FormLabel ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
));
Label.displayName = 'Label';
