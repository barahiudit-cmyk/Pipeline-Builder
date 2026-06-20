import { Search, Plus } from "lucide-react";
import { DraggableNode } from "../draggableNode";
import { coreNodes, utilityNodes } from "../../utils/nodeRegistry";

export const Sidebar = ({
  open,
  setSidebarOpen,
  search,
  setSearch,
  onNodeDrag,
}) => {
  const filterFn = (n) => n.label.toLowerCase().includes(search.toLowerCase());

  // called after tap-to-add on mobile - closes sidebar
  const handleAfterAdd = () => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  return (
    <aside
      className={`
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        fixed lg:relative top-[60px] lg:top-0 bottom-0 left-0
        w-[280px] lg:w-[260px]
        flex flex-col border-r
        border-gray-200 dark:border-[#1F1F23]
        bg-white dark:bg-[#111113] overflow-y-auto custom-scrollbar
        transition-transform duration-300 ease-out
        z-20
      `}
    >
      {/* search */}
      <div className="py-4 px-3 pb-3">
        <h2 className="text-[18px] font-medium tracking-tight mb-4">Nodes</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#71717A]"
            size={14}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search nodes..."
            className="w-full bg-gray-50 dark:bg-[#16161A]
                       border border-gray-200 dark:border-[#27272A]
                       rounded-lg py-2 pl-9 pr-12 text-[13px]
                       text-gray-900 dark:text-[#E5E5E7]
                       focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px]
                       bg-white dark:bg-[#0A0A0B]
                       px-1.5 py-0.5 rounded
                       border border-gray-200 dark:border-[#27272A]
                       text-gray-400 dark:text-[#71717A] font-mono"
          >
            ⌘
          </span>
        </div>
      </div>

      {/* categories */}
      <div className="px-3 py-4 flex flex-col gap-6" onDragStart={onNodeDrag}>
        <Category label="CORE NODES">
          {coreNodes.filter(filterFn).map((n) => (
            <DraggableNode key={n.type} {...n} onAfterAdd={handleAfterAdd} />
          ))}
        </Category>

        <Category label="UTILITY NODES">
          {utilityNodes.filter(filterFn).map((n) => (
            <DraggableNode key={n.type} {...n} onAfterAdd={handleAfterAdd} />
          ))}
        </Category>
      </div>

      {/* footer hint */}
      <div className="mt-auto p-4">
        <div
          className="border border-dashed border-gray-300 dark:border-[#27272A]
                        rounded-lg p-4 flex flex-col items-center justify-center text-center"
        >
          <div
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#16161A]
                          flex items-center justify-center mb-2"
          >
            <Plus size={14} className="text-gray-400 dark:text-[#71717A]" />
          </div>
          <p className="text-[11px] text-gray-500 dark:text-[#71717A] leading-relaxed">
            <span className="hidden lg:inline">Drag nodes onto the canvas</span>
            <span className="lg:hidden">
              Tap a node to add it to the canvas
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
};

const Category = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-bold tracking-[0.1em] text-gray-400 dark:text-[#71717A] px-2">
      {label}
    </span>
    <div className="flex flex-col gap-1.5">{children}</div>
  </div>
);
