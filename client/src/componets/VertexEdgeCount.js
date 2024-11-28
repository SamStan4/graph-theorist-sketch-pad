import { useState, useEffect } from "react";

const VertexEdgeCount = ({ graph }) => {
  const [vertexCount, setVertexCount] = useState(graph.getNodeCount());
  const [edgeCount, setEdgeCount] = useState(graph.getEdgeCount());

  useEffect(() => {
    setVertexCount(graph.getNodeCount());
    setEdgeCount(graph.getEdgeCount());
  }, [graph])

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          margin: "3px"
        }}
      >
        Vertex count: {vertexCount} Edge count: {edgeCount}
      </p>
    </div>
  );
}

export default VertexEdgeCount;