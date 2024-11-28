import NodeColumn from "./NodeColumn.js";
import EdgeColumn from "./EdgeColumn.js";

const GraphProperties = ({ graph, onRemoveNode, onRemoveEdge, onAddNode, onAddEdge }) => {
  return (
    <div
      style={{
        width: "20%",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        backgroundColor: "#f4f4f4",
        flexDirection: "column"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          margin: "0",
          padding: "10px"
        }}
      >
        Graph Properties
      </h2>
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "auto",
        }}
      >
        <NodeColumn
          graph={graph}
          onRemove={onRemoveNode}
          onAdd={onAddNode}
        />
        <EdgeColumn
          graph={graph}
          onRemove={onRemoveEdge}
          onAdd={onAddEdge}
        />
      </div>
    </div>
  );
}
  
export default GraphProperties;