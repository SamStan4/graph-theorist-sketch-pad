import { useState, useEffect } from "react";

const VertexEdgeCount = ({ graph }) => {
  const [vertexCount, setVertexCount] = useState(graph.getVertexCount());
  const [edgeCount, setEdgeCount] = useState(graph.getEdgeCount());

  useEffect(() => {
    setVertexCount(graph.getVertexCount());
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