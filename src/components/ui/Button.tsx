import React from "react";

export type ButtonVariant = "primary" | "secondary" | "over-photo" | "danger";
export type ButtonSize = "md" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText = "Memproses...",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body font-semibold transition-all duration-150 rounded-pill focus:outline-none focus-visible:ring-3 focus-visible:ring-primary-dark focus-visible:ring-offset-2 active:scale-[0.98]";

    const sizeStyles =
      size === "sm"
        ? "min-h-[40px] px-5 text-[14px]"
        : "min-h-[48px] px-7 text-[15px]";

    let variantStyles = "";
    if (disabled || isLoading) {
      variantStyles =
        "bg-sage-deep text-muted cursor-not-allowed border border-line active:scale-100 shadow-none";
    } else {
      switch (variant) {
        case "primary":
          variantStyles =
            "bg-primary text-white hover:bg-primary-hover shadow-soft hover:shadow-lift";
          break;
        case "secondary":
          variantStyles =
            "bg-surface text-primary-hover border-[1.5px] border-primary hover:bg-sage";
          break;
        case "over-photo":
          variantStyles =
            "bg-transparent text-white border-[1.5px] border-white hover:bg-white/10";
          break;
        case "danger":
          variantStyles =
            "bg-danger text-white hover:opacity-90 shadow-soft";
          break;
      }
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>{loadingText}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
