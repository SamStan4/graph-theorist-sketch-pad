import NodeColumn from "./NodeColumn.js";
import EdgeColumn from "./EdgeColumn.js";

const GraphProperties = ({ graph, onRemoveNode, onRemoveEdge }) => {
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
          backgroundColor: "#00FFFF"
        }}
      >
        <NodeColumn
          graph={graph}
          onRemove={onRemoveNode}
        />
        <EdgeColumn
          graph={graph}
          onRemove={onRemoveEdge}
        />
      </div>
    </div>
  );
}
  
export default GraphProperties;