import EdgeColumn from "./EdgeColumn.js";
import VertexColumn from "./VertexColumn.js";

const GraphProperties = ({ graph, onRemoveVertex, onRemoveEdge, onAddVertex, onAddEdge }) => {
  return (
    <div
    style={{
      width: "20%",
      height: "calc(100vh - 70px)", // Set height to enable scrolling
      padding: "10px",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      display: "flex",
      backgroundColor: "#f4f4f4",
      flexDirection: "row",
      justifyContent: "space-between",
      overflowY: "auto",  // Allows vertical scrolling when the content is too tall
    }}
    >
      <VertexColumn
        graph={graph}
        onRemoveVertex={onRemoveVertex}
        onAddVertex={onAddVertex}
      />
      <EdgeColumn
        graph={graph}
        onRemoveEdge={onRemoveEdge}
        onAddEdge={onAddEdge}
      />
    </div>
  );
}
  
export default GraphProperties;