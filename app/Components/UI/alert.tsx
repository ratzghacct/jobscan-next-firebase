import * as React from "react"

export function Alert({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`border border-red-500 text-red-700 p-4 rounded-md ${className}`}>{children}</div>
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-bold mb-1">{children}</h3>
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

  
