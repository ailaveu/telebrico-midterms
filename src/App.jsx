import { useState } from "react";
import Registration from "./components/Registration";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
    console.log("Registered items so far:", [...items, newItem]);
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b-4 border-crimson bg-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="font-display text-2xl uppercase tracking-wide text-paper">
              The <span className="text-crimson-bright">Sound</span> Registry
            </h1>
            <p className="font-mono text-xs text-paper/50">Guitar Store &amp; Inventory Manager</p>
          </div>
        </div>
        <div className="fret-divider" />
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <Registration onAddItem={handleAddItem} />
      </main>

      <footer className="mx-auto max-w-5xl px-6 py-6">
        <p className="font-mono text-[11px] text-ink/30">
          Set B Guitar Store &amp; Inventory Manager · Midterm Practical
        </p>
      </footer>
    </div>
  );
}