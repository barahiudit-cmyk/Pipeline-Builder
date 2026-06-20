import { Undo2, Redo2, Sun, Moon, Menu, X } from 'lucide-react';

export const Header = ({
  sidebarOpen,
  setSidebarOpen,
  undo,
  redo,
  canUndo,
  canRedo,
  theme,
  toggleTheme,
}) => (
  <header
    className="h-[60px] min-h-[60px] flex items-center justify-between px-3 sm:px-4 border-b
               border-gray-200 dark:border-[#1F1F23]
               bg-white dark:bg-[#111113] z-30"
  >
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 text-gray-500 dark:text-[#71717A]
                   hover:text-gray-900 dark:hover:text-white
                   hover:bg-gray-100 dark:hover:bg-[#1F1F23]
                   rounded-md transition-all"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600
                      rounded-md flex items-center justify-center
                      font-bold text-white shadow-lg shadow-indigo-500/20">
        V
      </div>
      <span className="text-[13px] sm:text-[15px] font-semibold tracking-tight truncate">
        <span className="hidden sm:inline">VectorShift </span>Pipeline Builder
      </span>
    </div>

    <div className="flex items-center gap-2">
      <IconBtn onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <Undo2 size={18} />
      </IconBtn>
      <IconBtn onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)">
        <Redo2 size={18} />
      </IconBtn>
      <IconBtn
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </IconBtn>
    </div>
  </header>
);

const IconBtn = ({ children, onClick, disabled, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="p-2 text-gray-500 dark:text-[#71717A]
               hover:text-gray-900 dark:hover:text-white
               hover:bg-gray-100 dark:hover:bg-[#1F1F23]
               rounded-md transition-all
               disabled:opacity-30 disabled:cursor-not-allowed
               disabled:hover:bg-transparent
               disabled:hover:text-gray-500 dark:disabled:hover:text-[#71717A]"
  >
    {children}
  </button>
);