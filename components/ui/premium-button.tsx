"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white hover:brightness-110 hover:shadow-[0_0_28px_rgba(30,155,151,0.45)] active:brightness-95",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-line bg-transparent text-ink hover:bg-white/5 active:bg-white/10",
        secondary:
          "bg-white/[0.04] text-ink hover:bg-white/[0.08] active:bg-white/[0.12]",
        ghost: "text-ink hover:bg-white/5 active:bg-white/10",
        link: "text-brand underline-offset-4 hover:underline",
        premium:
          "relative overflow-hidden bg-gradient-to-r from-brand to-brand/80 text-white shadow-lg hover:shadow-[0_0_28px_rgba(30,155,151,0.5)] active:shadow-[0_0_16px_rgba(30,155,151,0.3)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-[100%]",
      },
      size: {
        default: "px-6 py-3 text-base",
        sm: "px-3.5 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
