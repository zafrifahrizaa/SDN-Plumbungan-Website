import React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export type AlertVariant = "info" | "sukses" | "peringatan" | "galat";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  className = "",
  id,
}) => {
  let bgClass = "bg-sage border-line text-ink";
  let IconComponent = Info;
  let iconClass = "text-muted";

  switch (variant) {
    case "sukses":
      bgClass = "bg-sage-deep border-primary/20 text-ink";
      IconComponent = CheckCircle2;
      iconClass = "text-primary";
      break;
    case "peringatan":
      bgClass = "bg-marigold-soft border-marigold/30 text-ink";
      IconComponent = AlertTriangle;
      iconClass = "text-marigold-ink";
      break;
    case "galat":
      bgClass = "bg-danger-soft border-danger/20 text-danger-ink";
      IconComponent = AlertCircle;
      iconClass = "text-danger";
      break;
    case "info":
    default:
      bgClass = "bg-sage border-line text-ink";
      IconComponent = Info;
      iconClass = "text-primary-hover";
      break;
  }

  const role = variant === "galat" ? "alert" : "status";

  return (
    <div
      id={id}
      role={role}
      className={`flex items-start gap-3 p-4 rounded-md border text-[15px] leading-relaxed ${bgClass} ${className}`}
    >
      <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} aria-hidden="true" />
      <div className="flex-1">
        {title && <h4 className="font-bold mb-1 text-[16px]">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
};
