import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

export const EmailNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="email"
      title="Email"
      icon="📩"
      fields={[
        {
          name: "to",
          label: "To",
          type: "text",
          defaultValue: "user@example.com",
        },
        { name: "subject", label: "Subject", type: "text", defaultValue: "" },
        { name: "body", label: "Body", type: "text", defaultValue: "" },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "sent" },
      ]}
    />
  );
};
