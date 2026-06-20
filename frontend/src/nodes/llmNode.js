
//llmNode.js
import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

// llm node - sends a system + prompt input to a language model
export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      type="llm"
      title="LLM"
      icon="🤖"
      fields={[
        {
          name: "model",
          label: "Model",
          type: "select",
          options: ["gpt-4", "gpt-3.5-turbo", "claude-3", "llama-3"],
          defaultValue: "gpt-4",
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "system",
          style: { top: "35%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: "prompt",
          style: { top: "70%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: "response",
        },
      ]}
    />
  );
};
