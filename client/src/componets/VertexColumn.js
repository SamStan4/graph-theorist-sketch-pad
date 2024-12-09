import { useEffect, useState } from "react";
import AddVertexItem from "./AddVertexItem";
import VertexItem from "./VertexItem.js"

const VertexColumn = ({ graph, onRemoveVertex, onAddVertex }) => {
  const [vertices, setVertices] = useState(graph.getAllVertexNamesAndDegree());
  useEffect(() => {
    setVertices(graph.getAllVertexNamesAndDegree());
  }, [graph]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
        flex: 1,
      }}
    >
      <h3
        style={{
          textAlign: "center",
       }}
      >
        Vertices
      </h3>
      <AddVertexItem
        onAddVertex={onAddVertex}
      />
      {vertices.map((vertexNameDeg, index) => (
        <VertexItem
          key={index}
          vertexName={vertexNameDeg.name}
          vertexDegree={vertexNameDeg.deg}
          onRemoveVertex={onRemoveVertex}
        />
      ))}
    </div>
  );
}

export default VertexColumn;