import ComponentStat from "./ComponentStat.js";
import LineSeparator from "./LineSeparator.js";
import ShowBridges from "./ShowBridges.js";
import VertexEdgeCount from "./VertexEdgeCount.js";

const GraphStats = ({ graph, onShowBridgesToggle, onShowMSTToggle, onApplyPhysicsToggle }) => {
  return (
    <div
      style={{
        width: "20%",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        backgroundColor: "#f4f4f4",
        flexDirection: "column",
      }}
    >
        <VertexEdgeCount
          graph={graph}
        />
        <LineSeparator/>
        <ComponentStat
          graph={graph}
        />
        <LineSeparator/>
        <ShowBridges
          onToggle={onShowBridgesToggle}
        />
    </div>
  );
}

export default GraphStats;