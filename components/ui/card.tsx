import * as React from "react"

export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`border rounded-lg shadow-md bg-white ${className}`}>{children}</div>
}

export function CardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
}
