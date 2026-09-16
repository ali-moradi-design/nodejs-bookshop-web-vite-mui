import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { cn } from '@/shared/lib';
import { Slot } from '@/shared/lib/slot';

type DialogCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = React.createContext<DialogCtx | null>(null);

function useDialog() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error('Dialog components must be used within <Dialog>');
  return ctx;
}

export function Dialog({
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
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : uncontrolled;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!controlled) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange],
  );
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setOpen } = useDialog();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    setOpen(true);
  };
  if (asChild) {
    return (
      <Slot onClick={onClick} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <button type="button" {...props} onClick={onClick}>
      {children}
    </button>
  );
}

export const DialogPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const DialogClose = ({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
  const { setOpen } = useDialog();
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
export const DialogOverlay = () => null;

export function DialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useDialog();
  return (
    <MuiDialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <Box className={cn('relative p-2', className)} {...props}>
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
    </MuiDialog>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box
      className={cn('mb-2 flex flex-col space-y-1.5 text-center sm:text-start', className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <MuiDialogActions className={cn('px-0 pt-4', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <MuiDialogTitle className={cn('!p-0 !text-lg !font-semibold', className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <MuiDialogContentText className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}
