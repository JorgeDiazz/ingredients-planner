"use client";

interface StepperProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

export default function Stepper({ label, value, onChange, min = 0, max = 99, step = 1, helperText }: StepperProps) {
  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const decrement = () => {
    const next = Math.round((value - step) * 100) / 100;
    if (next >= min) onChange(next);
  };

  const increment = () => {
    const next = Math.round((value + step) * 100) / 100;
    if (next <= max) onChange(next);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[13px] font-semibold text-ios-secondary-label tracking-wide">
          {label}
        </label>
      )}
      <div className="flex items-center bg-ios-gray-6/80 rounded-xl">
        <button type="button" onClick={decrement} disabled={!canDecrement} className="flex-1 h-14 rounded-l-xl flex items-center justify-center text-ios-label text-[22px] active:bg-ios-gray-5 disabled:opacity-25 disabled:pointer-events-none transition-colors">
          −
        </button>
        <span className="w-16 text-center text-[20px] font-bold tabular-nums text-ios-label select-none">{value}</span>
        <button type="button" onClick={increment} disabled={!canIncrement} className="flex-1 h-14 rounded-r-xl flex items-center justify-center text-ios-blue text-[22px] font-semibold active:bg-ios-blue/10 disabled:opacity-25 disabled:pointer-events-none transition-colors">
          +
        </button>
      </div>
      {helperText && (
        <p className="text-[12px] text-ios-gray-1 mt-1">{helperText}</p>
      )}
    </div>
  );
}
