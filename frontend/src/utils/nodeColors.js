// single source of truth for node colors
// add a new node? add one entry here.

export const NODE_COLORS = {
  customInput:  { hex: '#10B981', tw: 'emerald', name: 'Emerald' },
  customOutput: { hex: '#3B82F6', tw: 'blue',    name: 'Blue' },
  llm:          { hex: '#8B5CF6', tw: 'violet',  name: 'Violet' },
  text:         { hex: '#F59E0B', tw: 'amber',   name: 'Amber' },
  filter:       { hex: '#06B6D4', tw: 'cyan',    name: 'Cyan' },
  math:         { hex: '#EC4899', tw: 'pink',    name: 'Pink' },
  api:          { hex: '#0EA5E9', tw: 'sky',     name: 'Sky' },
  delay:        { hex: '#6B7280', tw: 'gray',    name: 'Gray' },
  conditional:  { hex: '#F97316', tw: 'orange',  name: 'Orange' },
  email:        { hex: '#F43F5E', tw: 'rose',    name: 'Rose' },
  webhook:      { hex: '#A855F7', tw: 'purple',  name: 'Purple' },
  
};

// fallback for unknown types
const FALLBACK = { hex: '#6366F1', tw: 'indigo', name: 'Indigo' };

// helper: get gradient classes for BaseNode header
export const getGradient = (type) => {
  const c = NODE_COLORS[type] || FALLBACK;
  return `from-${c.tw}-500 to-${c.tw}-600`;
};

// helper: get hex color for minimap
export const getHex = (type) => {
  const c = NODE_COLORS[type] || FALLBACK;
  return c.hex;
};

// helper: get text color class for sidebar icons
export const getTextColor = (type) => {
  const c = NODE_COLORS[type] || FALLBACK;
  return `text-${c.tw}-500`;
};