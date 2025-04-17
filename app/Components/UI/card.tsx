export function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="border rounded-lg shadow-md p-4 bg-white">
        {children}
      </div>
    );
  }
  