import { useEffect, useState } from "react";
import AddEdgeItem from "./AddEdgeItem";
import EdgeItem from "./EdgeItem";

const EdgeColumn = ({ graph, onRemoveEdge, onAddEdge }) => {
  const [edges, setEdges] = useState(graph.getAllEdgeNames());

  useEffect(() => {
    setEdges(graph.getAllEdgeNames());
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
          textAlign: "center"
        }}
      >
        Edges
      </h3>
      <AddEdgeItem
        onAddEdge={onAddEdge}
      />
      {edges.map(([vertexOneName, vertexTwoName], index) => (
        <EdgeItem
          key={index}
          vertexOne={vertexOneName}
          vertexTwo={vertexTwoName}
          onRemoveEdge={onRemoveEdge}
        />
      ))}
    </div>
  );
}
  
  export default EdgeColumn;