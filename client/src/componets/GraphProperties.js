import NodeColumn from "./NodeColumn.js";
import EdgeColumn from "./EdgeColumn.js";

const GraphProperties = ({ graph }) => {
  return (
    <div
      style={{
        width: "20%",
        backgroundColor: "#FF00FF",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
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
        <NodeColumn graph={graph}/>
        <EdgeColumn graph={graph}/>
      </div>
    </div>
  );
}
  
  export default GraphProperties;