import { PipelineUI } from "../PipelineCanvas";
import { EmptyCanvas } from "../EmptyCanvas";
import { ZoomControls } from "../ZoomControls";
export const Canvas = ({ theme, isEmpty }) => {
  const isDark = theme === 'dark';

  return (
    <main
      className="relative flex-1 overflow-hidden
                 bg-gray-50 dark:bg-[#0A0A0B]
                 transition-colors duration-200"
      style={{
        backgroundImage: isDark
          ? 'radial-gradient(#27272A 1px, transparent 0)'
          : 'radial-gradient(#D4D4D8 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    >
      <ZoomControls />
      {isEmpty && <EmptyCanvas />}
      <PipelineUI />
    </main>
  );
};