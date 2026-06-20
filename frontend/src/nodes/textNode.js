import { useMemo, useRef, useEffect } from 'react';
import { Position, Handle } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

// matches {{ anything }} - validate inner part separately
const VAR_PATTERN = /\{\{\s*([^}]+?)\s*\}\}/g;

// js variable name rule
const VALID_VAR = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export const TextNode = ({ id, data }) => {
  const text = data?.text ?? '{{input}}';
  const updateNodeField = useStore((s) => s.updateNodeField);
  const textareaRef = useRef(null);

  // auto-resize textarea on text change
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  // extract valid unique variables from the text
  const variables = useMemo(() => {
    const found = new Set();
    let match;
    while ((match = VAR_PATTERN.exec(text)) !== null) {
      const name = match[1].trim();
      if (VALID_VAR.test(name)) found.add(name);
    }
    return Array.from(found);
  }, [text]);

  return (
    <BaseNode
      id={id}
      data={data}
      type="text"
      title="Text"
      icon="📝"
      handles={[
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      {/* custom textarea (auto-resize + variable parsing) */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase font-semibold tracking-wide text-gray-500 dark:text-[#71717A]">
          Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          rows={1}
          className="rounded px-2 py-1 text-[12px] resize-none overflow-hidden
                     bg-gray-50 dark:bg-[#0A0A0B]
                     border border-gray-200 dark:border-[#27272A]
                     text-gray-900 dark:text-[#E5E5E7]
                     focus:outline-none focus:border-indigo-500
                     font-mono"
        />
      </div>

      {/* dynamic handles for each {{ variable }} */}
      {variables.map((name, i) => (
        <Handle
          key={name}
          type="target"
          position={Position.Left}
          id={`${id}-${name}`}
          style={{ top: `${((i + 1) * 100) / (variables.length + 1)}%` }}
        />
      ))}
    </BaseNode>
  );
};