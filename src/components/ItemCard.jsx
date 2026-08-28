export default function ItemCard({ activeItem }) {
  return (
    <div className="border border-ink/15 bg-white">
      <div className="flex items-center justify-between border-b border-ink/15 bg-ink px-5 py-3">
        <h2 className="font-display text-lg uppercase tracking-wide text-paper">
          Active Item Profile
        </h2>
      </div>

      {!activeItem ? (
        <p className="p-6 text-sm text-ink/50">
          Select a row in the table to view its full profile here.
        </p>
      ) : (
        <div className="p-5">
          <h3 className="font-display text-xl uppercase text-ink">
            {activeItem.guitarModel}
          </h3>
          <p className="text-sm text-ink/70">{activeItem.brandName}</p>
        </div>
      )}
    </div>
  );
}