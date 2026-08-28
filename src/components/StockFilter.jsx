

export default function StockFilter({ lowStockOnly, onToggle }) {

  return (
    <label className="flex w-fit items-center gap-2 border border-ink/15 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink/70">
      <input
        type="checkbox"
        checked={lowStockOnly}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-4 w-4 accent-crimson"
      />
      Show low stock only (&lt; 20 units)
    </label>

    
  );
}