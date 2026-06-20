//delayNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// delay node - waits for n ms before passing the value through
export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="delay"
      title="Delay"
      icon="⏱️"
      fields={[
        {
          name: "ms",
          label: "Delay (ms)",
          type: "number",
          defaultValue: 1000,
        },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "output" },
      ]}
    />
  );
};
