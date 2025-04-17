export function Button({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        {...props}
        className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
      >
        {children}
      </button>
    );
  }
  