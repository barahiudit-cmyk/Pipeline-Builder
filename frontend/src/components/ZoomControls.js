import { useState, useEffect } from "react";
import { useReactFlow, useViewport } from "reactflow";
import { Lock, Unlock, Maximize, Minus, Plus } from "lucide-react";

export const ZoomControls = () => {
  const { zoomIn, zoomOut, fitView, setNodes, setEdges } = useReactFlow();
  const { zoom } = useViewport();
  const [locked, setLocked] = useState(false);

  const zoomPercent = Math.round(zoom * 100);

  // toggle node interactivity by updating draggable/selectable flags
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        draggable: !locked,
        selectable: !locked,
        connectable: !locked,
      })),
    );
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        selectable: !locked,
      })),
    );
  }, [locked, setNodes, setEdges]);

  return (
    <div
      className=" flex absolute top-6 right-6 z-10 items-center
                 bg-white/80 dark:bg-[#111113]/80 backdrop-blur-md
                 border border-gray-200 dark:border-[#27272A]
                 rounded-full p-1 shadow-2xl">
      <ZoomBtn
        onClick={() => setLocked(!locked)}
        title={locked ? "Unlock canvas" : "Lock canvas"} >
        {locked ? <Lock size={14} /> : <Unlock size={14} />}
      </ZoomBtn>

      <Divider />

      <ZoomBtn
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
        title="Fit view"
      >
        <Maximize size={14} />
      </ZoomBtn>

      <Divider />

      <div className="flex items-center px-1">
        <ZoomBtn onClick={() => zoomOut({ duration: 200 })} title="Zoom out">
          <Minus size={14} />
        </ZoomBtn>
        <span className="text-[11px] font-medium w-10 text-center tabular-nums">
          {zoomPercent}%
        </span>
        <ZoomBtn onClick={() => zoomIn({ duration: 200 })} title="Zoom in">
          <Plus size={14} />
        </ZoomBtn>
      </div>
    </div>
  );
};

const ZoomBtn = ({ children, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 text-gray-500 dark:text-[#71717A]
               hover:text-gray-900 dark:hover:text-white
               transition-colors"
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-4 bg-gray-200 dark:bg-[#27272A] mx-1" />
);
