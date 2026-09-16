import * as React from 'react';
import { cn } from './cn';

type AnyProps = Record<string, unknown> & { className?: string; children?: React.ReactNode };

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value);
      else if (ref && typeof ref === 'object')
        (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

/** Minimal Radix-like Slot: merge props onto the single child element. */
export function Slot({ children, ...props }: AnyProps & { ref?: React.Ref<unknown> }) {
  if (!React.isValidElement(children)) return null;
  const child = children as React.ReactElement<AnyProps>;
  const childProps = child.props;
  return React.cloneElement(child, {
    ...props,
    ...childProps,
    className: cn(props.className, childProps.className),
    onClick: (...args: unknown[]) => {
      (props as { onClick?: (...a: unknown[]) => void }).onClick?.(...args);
      (childProps as { onClick?: (...a: unknown[]) => void }).onClick?.(...args);
    },
    ref: mergeRefs(
      (props as { ref?: React.Ref<unknown> }).ref,
      (child as unknown as { ref?: React.Ref<unknown> }).ref,
    ),
  } as AnyProps);
}
