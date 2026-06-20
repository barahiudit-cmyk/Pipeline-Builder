import { Handle } from 'reactflow';
import { useStore } from '../store';
import { getGradient } from '../utils/nodeColors';

export const BaseNode = ({
  id,
  data,
  type,
  title,
  icon,
  handles = [],
  fields = [],
  children,
}) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const gradient = getGradient(type);

  return (
    <div className="min-w-[220px] rounded-lg overflow-hidden shadow-lg
                    bg-white dark:bg-[#16161A]
                    border border-gray-200 dark:border-[#27272A]">
      <div className={`flex items-center gap-2 px-3 py-2
                      text-white text-[12px] font-semibold uppercase tracking-wider
                      bg-gradient-to-r ${gradient}`}>
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {fields.map((field) => {
          const value = data?.[field.name] ?? field.defaultValue ?? '';
          return (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-semibold tracking-wide
                                text-gray-500 dark:text-[#71717A]">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded px-2 py-1 text-[12px]
                             bg-gray-50 dark:bg-[#0A0A0B]
                             border border-gray-200 dark:border-[#27272A]
                             text-gray-900 dark:text-[#E5E5E7]
                             focus:outline-none focus:border-indigo-500"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="rounded px-2 py-1 text-[12px]
                             bg-gray-50 dark:bg-[#0A0A0B]
                             border border-gray-200 dark:border-[#27272A]
                             text-gray-900 dark:text-[#E5E5E7]
                             focus:outline-none focus:border-indigo-500"
                />
              )}
            </div>
          );
        })}

        {children}
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};