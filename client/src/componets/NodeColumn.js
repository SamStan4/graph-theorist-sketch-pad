import { useEffect, useState } from "react";
import NodeItem from "./NodeItem.js";

const NodeColumn = ({ graph, onRemove }) => {
  const [nodes, setNodes] = useState(graph.getNodeList());

  useEffect(() => {
    setNodes(graph.getNodeList());
  });

  const handleRemoveNodes = (nodeName) => {
    onRemove(nodeName);
    setNodes(Array.from(graph.nodes.keys()));
  }

  return (
    <div
      style={{
        width: "50%",
        flex: 1
      }}
    >
      <h3
        style={{
          textAlign: "center"
        }}
      >
        Vertices
      </h3>
      {nodes.map((nodeName, index) => (
        <NodeItem
          key={index}
          nodeName={nodeName}
          onRemove={handleRemoveNodes}
        />
      ))}
    </div>
  );
}

export default NodeColumn;