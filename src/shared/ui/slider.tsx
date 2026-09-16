import * as React from 'react';
import MuiSlider from '@mui/material/Slider';
import { cn } from '@/shared/lib';

type SliderProps = {
  className?: string;
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  disabled?: boolean;
  'aria-label'?: string;
};

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, value, defaultValue, onValueChange, min, max, step, disabled, ...props }, ref) => (
    <MuiSlider
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(_, v) => onValueChange?.(Array.isArray(v) ? v : [v])}
      className={cn(className)}
      valueLabelDisplay="off"
      {...props}
    />
  ),
);
Slider.displayName = 'Slider';
