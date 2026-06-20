//filterNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// filter node - keeps or drops values based on a condition
export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="filter"
      title="Filter"
      icon="🔍"
      fields={[
        {
          name: "condition",
          label: "Condition",
          type: "select",
          options: ["equals", "contains", "greater than", "less than"],
          defaultValue: "equals",
        },
        {
          name: "value",
          label: "Value",
          type: "text",
          defaultValue: "",
        },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "output" },
      ]}
    />
  );
};
