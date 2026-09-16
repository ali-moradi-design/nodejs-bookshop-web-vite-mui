import * as React from 'react';
import TextField from '@mui/material/TextField';
import { cn } from '@/shared/lib';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, onChange, ...props }, ref) => {
    if (type === 'file') {
      return (
        <input
          type="file"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium',
            className,
          )}
          ref={ref}
          onChange={onChange}
          {...props}
        />
      );
    }

    const {
      value,
      defaultValue,
      name,
      id,
      placeholder,
      disabled,
      required,
      min,
      max,
      step,
      autoComplete,
      onBlur,
      onFocus,
      onKeyDown,
    } = props;

    return (
      <TextField
        inputRef={ref}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        onBlur={onBlur as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLDivElement>}
        size="small"
        fullWidth
        className={className}
        slotProps={{
          htmlInput: {
            min,
            max,
            step,
            className:
              '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]',
          },
        }}
      />
    );
  },
);
Input.displayName = 'Input';
