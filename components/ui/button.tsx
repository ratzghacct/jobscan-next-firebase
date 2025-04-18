import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none";
    const variants = {
      default: "bg-purple-600 text-white hover:bg-purple-700",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    };
    return (
      <button
        className={`${base} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
