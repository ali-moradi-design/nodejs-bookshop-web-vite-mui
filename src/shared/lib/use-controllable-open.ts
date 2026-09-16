import * as React from 'react';

/** Controlled/uncontrolled open state for Dialog/Sheet-style overlays. */
export function useControllableOpen(
  openProp: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange?: (open: boolean) => void,
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? (openProp as boolean) : uncontrolled;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!controlled) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange],
  );
  return { open, setOpen } as const;
}
