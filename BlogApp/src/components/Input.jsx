import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', error, suffix, ...props },
  ref
) {
  const id = useId();
  const hasError = Boolean(error);
  const describedBy = hasError ? `${id}-error` : props['aria-describedby'];

  return (
    <div className={`flex flex-col gap-1 text-slate-700 dark:text-slate-200 ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full rounded-lg border px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
            hasError
              ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
              : 'border-gray-300 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 focus:dark:ring-blue-400'
          } ${suffix ? 'pr-12' : ''}`}
          id={id}
          type={type}
          ref={ref}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-auto absolute inset-y-0 right-3 flex items-center text-sm text-teal-500 dark:text-teal-300">
            {suffix}
          </span>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
