import { Network, GitBranch, Plus, MousePointerClick } from 'lucide-react';

export const EmptyCanvas = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]  p-4">
    <div className="max-w-md text-center px-6 py-8
                    bg-white/80 dark:bg-[#111113]/70 backdrop-blur-md
                    border border-gray-200 dark:border-[#27272A]
                    rounded-2xl shadow-2xl">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
        <Network size={26} className="text-indigo-500 dark:text-indigo-400" />
      </div>
      <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
        Your canvas is empty
      </h3>
      <p className="text-[13px] text-gray-500 dark:text-[#71717A] leading-relaxed mb-5">
        Drag a node from the sidebar to start building your pipeline. Connect nodes by dragging from one handle to another.
      </p>

      <div className="flex flex-col gap-2 text-left bg-gray-50 dark:bg-[#0A0A0B] border border-gray-200 dark:border-[#1F1F23] rounded-lg p-3">
        <Tip icon={<MousePointerClick size={13} className="text-indigo-500 dark:text-indigo-400" />} text="Drag nodes from the left panel" />
        <Tip icon={<GitBranch size={13} className="text-emerald-500 dark:text-emerald-400" />} text="Connect handles to define flow" />
        <Tip icon={<Plus size={13} className="text-amber-500 dark:text-amber-400" />} text="Submit to validate your pipeline" />
      </div>
    </div>
  </div>
);

const Tip = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-[12px] text-gray-600 dark:text-[#A1A1AA]">
    {icon}
    <span>{text}</span>
  </div>
);
