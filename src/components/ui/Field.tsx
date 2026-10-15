import React from "react";
import { AlertCircle } from "lucide-react";

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      name,
      id,
      helperText,
      error,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || `field-${name}`;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-[15px] font-semibold text-ink flex items-center justify-between"
        >
          <span>{label}</span>
          <span className="text-[13px] font-normal text-muted">
            {required ? "(wajib)" : "(opsional)"}
          </span>
        </label>

        {helperText && (
          <p id={helperId} className="text-[14px] text-muted -mt-0.5">
            {helperText}
          </p>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`min-h-[48px] px-4 py-2 text-[16px] rounded-sm bg-surface text-ink border-[1.5px] transition-colors duration-150 focus:outline-none focus:ring-0 ${
            error
              ? "border-danger focus:border-danger text-danger-ink"
              : "border-line focus:border-primary-dark"
          } ${className}`}
          {...props}
        />

        {error && (
          <div
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-[14px] text-danger font-medium mt-0.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
