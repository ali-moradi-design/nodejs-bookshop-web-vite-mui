import * as React from 'react';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { cn } from '@/shared/lib';
import { Slot } from '@/shared/lib/slot';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantMap: Record<
  ButtonVariant,
  { color?: MuiButtonProps['color']; variant?: MuiButtonProps['variant']; className?: string }
> = {
  default: { color: 'primary', variant: 'contained' },
  destructive: { color: 'error', variant: 'contained' },
  outline: { color: 'primary', variant: 'outlined' },
  secondary: { color: 'secondary', variant: 'contained' },
  ghost: { color: 'inherit', variant: 'text', className: 'hover:bg-accent' },
  link: {
    color: 'primary',
    variant: 'text',
    className: 'underline-offset-4 hover:underline p-0 min-w-0',
  },
};

const sizeMap: Record<Exclude<ButtonSize, 'icon'>, MuiButtonProps['size']> = {
  default: 'medium',
  sm: 'small',
  lg: 'large',
};

/** Compatibility helper formerly backed by CVA — returns Tailwind-ish class hints. */
export function buttonVariants(opts?: {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  className?: string;
}) {
  const v = opts?.variant ?? 'default';
  const s = opts?.size ?? 'default';
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    v === 'default' && 'bg-primary text-primary-foreground',
    v === 'destructive' && 'bg-destructive text-destructive-foreground',
    v === 'outline' && 'border border-input bg-background',
    v === 'secondary' && 'bg-secondary text-secondary-foreground',
    v === 'ghost' && 'hover:bg-accent',
    v === 'link' && 'text-primary underline-offset-4',
    s === 'default' && 'h-10 px-4 py-2',
    s === 'sm' && 'h-8 px-3 text-xs',
    s === 'lg' && 'h-11 px-8',
    s === 'icon' && 'h-10 w-10',
    opts?.className,
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      children,
      disabled,
      type,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    const mapped = variantMap[variant];

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), mapped.className, className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    if (size === 'icon') {
      return (
        <IconButton
          ref={ref}
          color={
            mapped.color === 'inherit'
              ? 'default'
              : ((mapped.color as 'primary' | 'error' | 'secondary' | 'default' | undefined) ??
                'default')
          }
          disabled={disabled}
          type={type}
          className={cn(mapped.className, className)}
          size="medium"
          {...(props as React.ComponentProps<typeof IconButton>)}
        >
          {children}
        </IconButton>
      );
    }

    return (
      <MuiButton
        ref={ref}
        color={mapped.color}
        variant={mapped.variant}
        size={sizeMap[size]}
        disabled={disabled}
        type={type}
        startIcon={startIcon}
        endIcon={endIcon}
        className={cn(mapped.className, className)}
        disableElevation={
          variant === 'default' || variant === 'secondary' || variant === 'destructive'
        }
        {...(props as MuiButtonProps)}
      >
        {children}
      </MuiButton>
    );
  },
);
Button.displayName = 'Button';
