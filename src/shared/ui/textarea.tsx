import * as React from 'react';
import TextField from '@mui/material/TextField';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, onChange, ...props }, ref) => {
    const {
      value,
      defaultValue,
      name,
      id,
      placeholder,
      disabled,
      required,
      rows,
      onBlur,
      onFocus,
    } = props;
    return (
      <TextField
        inputRef={ref}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        onBlur={onBlur as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        multiline
        minRows={rows ?? 3}
        fullWidth
        size="small"
        className={className}
      />
    );
  },
);
Textarea.displayName = 'Textarea';
