import { useEffect, useState } from "react";
import EdgeItem from "./EdgeItem";
import AddEdgeItem from "./AddEdgeItem";

const EdgeColumn = ({ graph, onRemove, onAdd }) => {
  const [edges, setEdges] = useState(graph.getEdgeList());

  useEffect(() => {
    setEdges(graph.getEdgeList());
  }, [graph]);

  const handleEdgeRemove = (nodeOne, nodeTwo) => {
    onRemove(nodeOne, nodeTwo);
    setEdges(graph.getEdgeList());
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
        >Edges</h3>
        <AddEdgeItem
          onAdd={onAdd}
        />
        {edges.map(([nodeOne, nodeTwo], index) => (
          <EdgeItem
            key={index}
            nodeOne={nodeOne}
            nodeTwo={nodeTwo}
            onRemove={handleEdgeRemove}
          />
        ))}
      </div>
    );
  }
  
  export default EdgeColumn;