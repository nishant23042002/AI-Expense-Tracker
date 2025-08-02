export default function CustomLegend({ payload }) {
  return (
    <ul className="flex flex-wrap gap-3 mt-4 justify-center text-sm text-slate-200">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

