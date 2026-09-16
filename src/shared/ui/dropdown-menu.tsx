import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import { cn } from '@/shared/lib';
import { Slot } from '@/shared/lib/slot';

type MenuCtx = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  close: () => void;
};

const DropdownMenuContext = React.createContext<MenuCtx | null>(null);

function useMenu() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenu parts must be used within <DropdownMenu>');
  return ctx;
}

export function DropdownMenu({ children }: { children?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const close = React.useCallback(() => setAnchorEl(null), []);
  return (
    <DropdownMenuContext.Provider value={{ anchorEl, setAnchorEl, close }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setAnchorEl } = useMenu();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    setAnchorEl(e.currentTarget);
  };
  if (asChild) return <Slot onClick={onClick}>{children}</Slot>;
  return (
    <button type="button" {...props} onClick={onClick}>
      {children}
    </button>
  );
}

export const DropdownMenuGroup = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const DropdownMenuPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export function DropdownMenuContent({
  children,
  className,
  align = 'end',
}: {
  children?: React.ReactNode;
  className?: string;
  align?: 'start' | 'end' | 'center';
  sideOffset?: number;
}) {
  const { anchorEl, close } = useMenu();
  const open = Boolean(anchorEl);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: align === 'start' ? 'left' : align === 'center' ? 'center' : 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: align === 'start' ? 'left' : align === 'center' ? 'center' : 'right',
      }}
      slotProps={{ paper: { className: cn('min-w-[8rem]', className) } }}
    >
      {children}
    </Menu>
  );
}

export function DropdownMenuItem({
  className,
  inset,
  onClick,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { inset?: boolean }) {
  const { close } = useMenu();
  return (
    <MenuItem
      className={cn(inset && 'ps-8', className)}
      onClick={(e) => {
        onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
        close();
      }}
      {...(props as object)}
    >
      {children}
    </MenuItem>
  );
}

export function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <ListSubheader
      className={cn('!leading-8 !text-sm !font-semibold', className)}
      {...(props as object)}
    />
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <Divider className={cn('my-1', className)} />;
}
