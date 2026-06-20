//conditionalNode.js

import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// conditional node - splits flow into true/false branches
export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="conditional"
      title="Conditional"
      icon="🔀"
      fields={[
        {
          name: "expression",
          label: "Expression",
          type: "text",
          defaultValue: "x > 0",
        },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        {
          type: "source",
          position: Position.Right,
          id: "true",
          style: { top: "35%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: "false",
          style: { top: "70%" },
        },
      ]}
    />
  );
};
