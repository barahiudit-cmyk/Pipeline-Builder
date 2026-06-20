import { useState, useEffect } from "react";

import { Header } from "./components/layouts/Header";
import { Sidebar } from "./components/layouts/Sidebar";
import { Canvas } from "./components//layouts/Canvas";
import { SubmitButton } from "./components/SubmitButton";
import { useStore } from "./store";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const nodes = useStore((s) => s.nodes);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const canUndo = useStore((s) => s.past.length > 0);
  const canRedo = useStore((s) => s.future.length > 0);

  const handleNodeDrag = () => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (mod && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden font-sans
                    text-gray-900 dark:text-[#E5E5E7]
                    bg-gray-50 dark:bg-[#0A0A0B]"
    >
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
          />
        )}

        <Sidebar
          open={sidebarOpen}
          setSidebarOpen={setSidebarOpen} // ← ADD THIS
          search={search}
          setSearch={setSearch}
          onNodeDrag={handleNodeDrag}
        />

        <Canvas theme={theme} isEmpty={nodes.length === 0} />
      </div>

      <SubmitButton />
    </div>
  );
}

export default App;
