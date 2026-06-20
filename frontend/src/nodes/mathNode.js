//mathNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// math node - performs basic arithmetic on two inputs
export const MathNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="math"
      title="Math"
      icon="🧮"
      fields={[
        {
          name: "operation",
          label: "Operation",
          type: "select",
          options: ["add", "subtract", "multiply", "divide"],
          defaultValue: "add",
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "a",
          style: { top: "35%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: "b",
          style: { top: "70%" },
        },
        { type: "source", position: Position.Right, id: "result" },
      ]}
    />
  );
};
