import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { cn } from '@/shared/lib';
import { Slot } from '@/shared/lib/slot';
import { useControllableOpen } from '@/shared/lib/use-controllable-open';

type SheetCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SheetContext = React.createContext<SheetCtx | null>(null);

function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error('Sheet components must be used within <Sheet>');
  return ctx;
}

export function Sheet({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const { open, setOpen } = useControllableOpen(openProp, defaultOpen, onOpenChange);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setOpen } = useSheet();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    setOpen(true);
  };
  if (asChild) return <Slot onClick={onClick}>{children}</Slot>;
  return (
    <button type="button" {...props} onClick={onClick}>
      {children}
    </button>
  );
}

export const SheetClose = ({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
  const { setOpen } = useSheet();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    setOpen(false);
  };
  if (asChild) return <Slot onClick={onClick}>{children}</Slot>;
  return (
    <button type="button" {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export const SheetPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const SheetOverlay = () => null;

type Side = 'top' | 'bottom' | 'left' | 'right';

export function SheetContent({
  side = 'right',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: Side }) {
  const { open, setOpen } = useSheet();
  return (
    <Drawer anchor={side} open={open} onClose={() => setOpen(false)}>
      <Box
        className={cn('relative flex h-full w-full flex-col', className)}
        sx={{
          width: { xs: '100vw', sm: 448 },
          maxWidth: '100vw',
          boxSizing: 'border-box',
        }}
        {...props}
      >
        <IconButton
          aria-label="Close"
          onClick={() => setOpen(false)}
          size="small"
          sx={{ position: 'absolute', top: 8, insetInlineEnd: 8, zIndex: 1 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        {children}
      </Box>
    </Drawer>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box
      className={cn('flex flex-col space-y-2 pe-10 text-center sm:text-start', className)}
      {...props}
    />
  );
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography variant="h6" component="h2" className={cn('font-semibold', className)} {...props} />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Typography variant="body2" color="text.secondary" className={cn(className)} {...props} />;
}
