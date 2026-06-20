import { useState, useRef, useCallback } from "react";
import ReactFlow, { Background, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { getHex } from "../utils/nodeColors";
import { useStore } from "../store";

import { InputNode } from "../nodes/inputNode";
import { LLMNode } from "../nodes/llmNode";
import { OutputNode } from "../nodes/outputNode";
import { TextNode } from "../nodes/textNode";
import { FilterNode } from "../nodes/filterNode";
import { MathNode } from "../nodes/mathNode";
import { APINode } from "../nodes/apiNode";
import { DelayNode } from "../nodes/delayNode";
import { ConditionalNode } from "../nodes/conditionalNode";
import { EmailNode } from "../nodes/emailNode";
import { WebhookNode } from "../nodes/webhookNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  math: MathNode,
  api: APINode,
  delay: DelayNode,
  conditional: ConditionalNode,
  email: EmailNode,
  webhook: WebhookNode,
};

// matches the BaseNode color tokens
// const MINIMAP_COLORS = {
//   customInput: "#10B981",
//   customOutput: "#3B82F6",
//   llm: "#8B5CF6",
//   text: "#F59E0B",
//   filter: "#06B6D4",
//   math: "#EC4899",
//   api: "#0EA5E9",
//   delay: "#6B7280",
//   conditional: "#F97316",
//   email: "#F43F5E",
//   webhook: "#A855F7",
// };

// const miniMapNodeColor = (node) => MINIMAP_COLORS[node.type] || "#6366F1";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, addNode, getNodeID],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#27272A" gap={gridSize} />
        <MiniMap
          nodeColor={(node) => getHex(node.type)}
          nodeStrokeColor={(node) => getHex(node.type)}
          nodeBorderRadius={2}
          nodeStrokeWidth={1}
          maskColor="rgba(0, 0, 0, 0.6)"
          pannable
          zoomable
          className="custom-minimap"
        />
      </ReactFlow>
    </div>
  );
};
