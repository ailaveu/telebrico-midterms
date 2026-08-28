import { useEffect, useState } from "react";
import profilePicture from "../assets/profile-card.jpg";

export default function ItemCard({ activeItem }) {
  const [displayedItem, setDisplayedItem] = useState(null);

  useEffect(() => {
    setDisplayedItem(activeItem ?? null);
  }, [activeItem]);

  return (

    <div className="border border-ink/15 bg-white">
      <div className="flex items-center justify-between border-b border-ink/15 bg-ink px-5 py-3">
        <h2 className="font-display text-lg uppercase tracking-wide text-paper">
          Active Item Profile
        </h2>

      </div>

      {!displayedItem ? (
        <p className="p-6 text-sm text-ink/50">
          Select a row in the table to view its full profile here.
        </p>
      ) : (

        <div className="flex gap-4 p-5">
          <img
            src={profilePicture}
            alt={displayedItem.guitarModel}
            className="h-28 w-28 shrink-0 object-cover"
          />

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl uppercase text-ink">
                {displayedItem.guitarModel}
              </h3>
              <span
                className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 ${
                  displayedItem.userRole === "Merchant"
                    ? "bg-crimson text-white"
                    : "bg-ink text-white"
                }`}

              >
                {displayedItem.userRole}
              </span>
            </div>


            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-body text-sm text-ink/80">
              <dt className="text-ink/50">Body Type</dt>
              <dd>{displayedItem.bodyType}</dd>
              <dt className="text-ink/50">Brand</dt>
              <dd>{displayedItem.brandName}</dd>
              <dt className="text-ink/50">Stock</dt>
              <dd>{displayedItem.stockQuantity} units</dd>
              <dt className="text-ink/50">Manufacturer</dt>
              <dd>{displayedItem.manufacturerName}</dd>
            </dl>

          </div>
        </div>

      )}


    </div>

  );
}