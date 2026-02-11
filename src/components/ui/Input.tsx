import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-zxnova-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-zxnova-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 border border-gray-300 rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-zxnova-secondary focus:border-transparent',
              'placeholder-gray-400 text-zxnova-primary',
              'transition-colors duration-200',
              icon && 'pl-10',
              error && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
