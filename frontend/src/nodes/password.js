import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

export const EmailNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="password"
      title="Password"
      icon="📩"
      fields={[
        {
          name: "to",
          label: "To",
          type: "text",
          defaultValue: "*********",
        },
        { name: "subject", label: "Subject", type: "password", defaultValue: "" },
        { name: "body", label: "Body", type: "password", defaultValue: "" },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "sent" },
      ]}
    />
  );
};
