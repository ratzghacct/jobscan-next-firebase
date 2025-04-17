export function Alert({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div className="border-l-4 border-red-500 bg-red-100 p-4">
        <h4 className="font-semibold text-red-600">{title}</h4>
        <p className="text-sm text-red-700">{description}</p>
      </div>
    );
  }
  