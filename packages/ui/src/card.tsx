export function Card({
  className = "",
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 w-full max-w-xl ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {href && (
          <a
            // href={href}
            className="text-sm text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            →
          </a>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
