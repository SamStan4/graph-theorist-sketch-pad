import { useEffect, useState } from "react";

const AdjacencyMatrix = ({ graph }) => {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState(graph.getAdjacencyMatrix());
  useEffect(() => {
    setAdjacencyMatrix(graph.getAdjacencyMatrix());
  }, [graph]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${adjacencyMatrix.length}, 1fr)`,
        gap: "5px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {adjacencyMatrix.map((row, rowIdx) => (
        row.map((value, colIdx) => (
          <div
            key={`cell-${rowIdx}-${colIdx}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value}
          </div>
        ))
      ))}
    </div>
  );
}

export default AdjacencyMatrix;