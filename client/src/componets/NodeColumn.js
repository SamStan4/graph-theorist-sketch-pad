import { useEffect, useState } from "react";
import NodeItem from "./NodeItem.js";
import AddNodeItem from "./AddNodeItem.js";

const NodeColumn = ({ graph, onRemove, onAdd }) => {
  const [nodes, setNodes] = useState(graph.getNodeList());

  useEffect(() => {
    setNodes(graph.getNodeList());
  }, [graph]);

  const handleRemoveNodes = (nodeName) => {
    onRemove(nodeName);
    setNodes(graph.getNodeList());
  }

  const handleAddNode = (nodeName) => {
    onAdd(nodeName);
    setNodes(graph.getNodeList());
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
      <AddNodeItem
        onAdd={handleAddNode}
      />
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