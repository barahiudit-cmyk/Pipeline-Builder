import { useEffect } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Network,
  GitBranch,
} from "lucide-react";

export const ResultModal = ({ result, onClose }) => {
  // close on escape key
  useEffect(() => {
    if (!result) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, onClose]);

  if (!result) return null;

  const { num_nodes, num_edges, is_dag } = result;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm
                 animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-md mx-4
                   bg-white dark:bg-[#16161A]
                   border border-gray-200 dark:border-[#27272A]
                   rounded-2xl shadow-2xl
                   animate-in zoom-in-95 duration-200">
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md
                     text-gray-400 hover:text-gray-900 dark:hover:text-white
                     hover:bg-gray-100 dark:hover:bg-[#27272A]
                     transition-colors">
          <X size={16} />
        </button>

        {/* header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white tracking-tight">
            Pipeline Summary
          </h2>
          <p className="text-[13px] text-gray-500 dark:text-[#71717A] mt-1">
            Backend validation results
          </p>
        </div>

        {/* stat cards */}
        <div className="px-6 grid grid-cols-2 gap-3">
          <StatCard
            icon={<Network size={18} className="text-indigo-500" />}
            label="Nodes"
            value={num_nodes}
          />
          <StatCard
            icon={<GitBranch size={18} className="text-blue-500" />}
            label="Edges"
            value={num_edges}
          />
        </div>

        {/* dag status */}
        <div className="px-6 pt-4 pb-6">
          <StatusBanner isValid={is_dag} />
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-[#27272A] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg
                       bg-indigo-500 hover:bg-indigo-600
                       text-white text-[13px] font-medium
                       transition-colors">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div
    className="flex items-center gap-3 p-3
                  bg-gray-50 dark:bg-[#0A0A0B]
                  border border-gray-200 dark:border-[#27272A]
                  rounded-lg">
    <div
      className="p-2 rounded-md bg-white dark:bg-[#16161A]
                    border border-gray-200 dark:border-[#27272A]">
      {icon}
    </div>
    <div>
      <div
        className="text-[11px] uppercase tracking-wider font-semibold
                      text-gray-500 dark:text-[#71717A]">
        {label}
      </div>
      <div className="text-[20px] font-bold text-gray-900 dark:text-white leading-tight">
        {value}
      </div>
    </div>
  </div>
);

const StatusBanner = ({ isValid }) =>
  isValid ? (
    <div
      className="flex items-start gap-3 p-3 rounded-lg
                    bg-emerald-50 dark:bg-emerald-500/10
                    border border-emerald-200 dark:border-emerald-500/20">
      <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
      <div>
        <div className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">
          Valid Pipeline
        </div>
        <div className="text-[12px] text-emerald-600/80 dark:text-emerald-400/70 mt-0.5">
          Your pipeline is a valid Directed Acyclic Graph.
        </div>
      </div>
    </div>
  ) : (
    <div
      className="flex items-start gap-3 p-3 rounded-lg
                    bg-rose-50 dark:bg-rose-500/10
                    border border-rose-200 dark:border-rose-500/20">
      <AlertTriangle size={18} className="text-rose-500 mt-0.5 shrink-0" />
      <div>
        <div className="text-[13px] font-semibold text-rose-700 dark:text-rose-400">
          Cycle Detected
        </div>
        <div className="text-[12px] text-rose-600/80 dark:text-rose-400/70 mt-0.5">
          Your pipeline contains a cycle and is not a valid DAG.
        </div>
      </div>
    </div>
  );
