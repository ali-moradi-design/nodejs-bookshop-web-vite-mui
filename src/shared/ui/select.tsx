import * as React from 'react';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { cn } from '@/shared/lib';

type SelectCtx = {
  value?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
  menuItems: React.ReactNode;
  setMenuItems: (n: React.ReactNode) => void;
  placeholder?: string;
  setPlaceholder: (p?: string) => void;
  labelsRef: React.MutableRefObject<Record<string, React.ReactNode>>;
  bump: () => void;
};

const SelectContext = React.createContext<SelectCtx | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('Select parts must be used within <Select>');
  return ctx;
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  disabled,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const [menuItems, setMenuItems] = React.useState<React.ReactNode>(null);
  const [placeholder, setPlaceholder] = React.useState<string | undefined>();
  const [, setTick] = React.useState(0);
  const labelsRef = React.useRef<Record<string, React.ReactNode>>({});
  const controlled = value !== undefined;
  const actual = controlled ? value : uncontrolled;

  const bump = React.useCallback(() => setTick((t) => t + 1), []);

  const handleChange = React.useCallback(
    (v: string) => {
      if (!controlled) setUncontrolled(v);
      onValueChange?.(v);
    },
    [controlled, onValueChange],
  );

  const ctx = React.useMemo(
    () => ({
      value: actual,
      onValueChange: handleChange,
      disabled,
      menuItems,
      setMenuItems,
      placeholder,
      setPlaceholder,
      labelsRef,
      bump,
    }),
    [actual, handleChange, disabled, menuItems, placeholder, bump],
  );

  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

export function SelectGroup({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = useSelect();
  React.useEffect(() => {
    if (placeholder !== undefined) ctx.setPlaceholder(placeholder);
  }, [placeholder, ctx.setPlaceholder]);
  return null;
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  const ctx = useSelect();
  void children;
  return (
    <FormControl fullWidth size="small" disabled={ctx.disabled} className={cn(className)}>
      <MuiSelect
        value={ctx.value ?? ''}
        displayEmpty
        MenuProps={{ disableScrollLock: true }}
        onChange={(e) => ctx.onValueChange?.(String(e.target.value))}
        renderValue={(selected) => {
          const s = String(selected ?? '');
          if (!s) return <span className="text-muted-foreground">{ctx.placeholder ?? ''}</span>;
          return <>{ctx.labelsRef.current[s] ?? s}</>;
        }}
        {...(props as object)}
      >
        {ctx.menuItems}
      </MuiSelect>
    </FormControl>
  );
}

export function SelectContent({ children }: { children?: React.ReactNode; position?: string }) {
  const { setMenuItems } = useSelect();
  React.useLayoutEffect(() => {
    setMenuItems(children);
    return () => setMenuItems(null);
  }, [children, setMenuItems]);
  return null;
}

export function SelectItem({
  value,
  children,
  disabled,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const { labelsRef, bump } = useSelect();
  React.useEffect(() => {
    if (labelsRef.current[value] !== children) {
      labelsRef.current[value] = children;
      bump();
    }
  }, [value, children, labelsRef, bump]);
  return (
    <MenuItem value={value} disabled={disabled} className={cn(className)}>
      {children}
    </MenuItem>
  );
}
