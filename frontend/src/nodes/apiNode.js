//apiNode.js

import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// api node - sends an http request and outputs the response
export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="api"
      title="API Request"
      icon="🌐"
      fields={[
        {
          name: "method",
          label: "Method",
          type: "select",
          options: ["GET", "POST", "PUT", "DELETE"],
          defaultValue: "GET",
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          defaultValue: "https://api.example.com",
        },
        {
          name: "timeout",
          label: "Timeout (ms)",
          type: "number",
          defaultValue: 5000,
        },
      ]}
      handles={[
        { type: "target", position: Position.Left, id: "body" },
        { type: "source", position: Position.Right, id: "response" },
      ]}
    />
  );
};
