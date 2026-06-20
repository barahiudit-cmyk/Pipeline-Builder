import { useReactFlow } from 'reactflow';
import { useStore } from '../store';

export const DraggableNode = ({ type, label, icon, onAfterAdd }) => {
  const addNode = useStore((s) => s.addNode);
  const getNodeID = useStore((s) => s.getNodeID);
  const reactFlow = useReactFlow();

  // desktop drag
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  // mobile tap-to-add
  const handleClick = () => {
    // only fire on mobile - desktop uses drag
    if (window.innerWidth >= 1024) return;

    const id = getNodeID(type);

    // place node at the center of the visible canvas
    const center = reactFlow.screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // small random offset so nodes don't stack exactly on top
    const offset = Math.random() * 60 - 30;

    addNode({
      id,
      type,
      position: { x: center.x + offset, y: center.y + offset },
      data: { id, nodeType: type },
    });

    if (onAfterAdd) onAfterAdd();
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onClick={handleClick}
      className="flex items-center gap-3 px-3 py-2.5
                 bg-gray-50 dark:bg-[#16161A]
                 border border-gray-200 dark:border-[#27272A]
                 rounded-lg cursor-pointer lg:cursor-grab
                 hover:border-indigo-500/30
                 hover:bg-gray-100 dark:hover:bg-[#1C1C22]
                 active:scale-95
                 transition-all group select-none"
    >
      {icon}
      <span className="text-[13px] font-medium text-gray-700 dark:text-[#E5E5E7] group-hover:text-gray-900 dark:group-hover:text-white">
        {label}
      </span>
    </div>
  );
};