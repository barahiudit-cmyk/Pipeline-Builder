//inputNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// input node - lets user define a named input (text or file)
export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="customInput"
      title="Input"
      icon="📥"
      fields={[
        {
          name: "inputName",
          label: "Name",
          type: "text",
          defaultValue: id.replace("customInput-", "input_"),
        },
        {
          name: "inputType",
          label: "Type",
          type: "select",
          options: ["Text", "File"],
          defaultValue: "Text",
        },
      ]}
      handles={[{ type: "source", position: Position.Right, id: "value" }]}
    />
  );
};
