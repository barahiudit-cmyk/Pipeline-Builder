//outputNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// output node - represents a named output of the pipeline
export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="customOutput"
      title="Output"
      icon="📤"
      fields={[
        {
          name: "outputName",
          label: "Name",
          type: "text",
          defaultValue: id.replace("customOutput-", "output_"),
        },
        {
          name: "outputType",
          label: "Type",
          type: "select",
          options: ["Text", "Image"],
          defaultValue: "Text",
        },
      ]}
      handles={[{ type: "target", position: Position.Left, id: "value" }]}
    />
  );
};
