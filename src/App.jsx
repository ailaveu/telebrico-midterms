import { useMemo, useState } from "react";
import Registration from "./components/Registration";
import InventoryTable from "./components/InventoryTable";
import ItemCard from "./components/ItemCard";
import StockFilter from "./components/StockFilter";


export default function App() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [view, setView] = useState("form");
  const [lowStockOnly, setLowStockOnly] = useState(false);


  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
    setView("registry");
  }


  function handleSelectRow(item) {
    setActiveItem(item);
  }


  const visibleItems = useMemo(
    () => (lowStockOnly ? items.filter((i) => i.stockQuantity < 20) : items),
    [items, lowStockOnly]
  );


  return (

    <div className="min-h-screen bg-paper">
      <header className="border-b-4 border-crimson bg-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="font-display text-2xl uppercase tracking-wide text-paper">
              The<span className="text-crimson-bright">Sound</span> Registry
            </h1>
            <p className="font-mono text-xs text-paper/50">Guitar Store &amp; Inventory Manager</p>
          </div>
          <nav className="flex gap-1">

            <button
              onClick={() => setView("form")}
              className={`font-mono text-xs uppercase tracking-wide px-4 py-2 transition ${
                view === "form" ? "bg-crimson text-white" : "text-paper/60 hover:text-paper"
              }`}
            >
              Register
            </button>

            <button
              onClick={() => setView("registry")}
              className={`font-mono text-xs uppercase tracking-wide px-4 py-2 transition ${
                view === "registry" ? "bg-crimson text-white" : "text-paper/60 hover:text-paper"
              }`}
            >
              Registry ({items.length})
            </button>

          </nav>
        </div>
        <div className="fret-divider" />
      </header>
      

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        {view === "form" ? (
          <Registration onAddItem={handleAddItem} />
        ) : (
          <>
            <StockFilter lowStockOnly={lowStockOnly} onToggle={setLowStockOnly} />
            <InventoryTable
              items={visibleItems}
              activeItemId={activeItem?.id}
              onSelectRow={handleSelectRow}
            />
            <ItemCard activeItem={activeItem} />
          </>
        )}
      </main>


      <footer className="mx-auto max-w-5xl px-6 py-6">
        <p className="font-mono text-[11px] text-ink/30">
          Set B Guitar Store &amp; Inventory Manager · Midterm Practical
        </p>
      </footer>
    </div>
  );
}